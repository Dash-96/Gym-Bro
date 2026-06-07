import { retryRequestConfig } from "@/src/utils/axiosUtils";
import { RefreshError } from "@/src/utils/customError";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import { refreshAccess } from "../authApi";
import { httpClient } from "./httpClient";

export const authClient = axios.create({ baseURL: "http://10.223.146.241:5276/api/auth" });

//= Handle authentication failure
authClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as retryRequestConfig;
    if (error.response?.status === 401 && originalRequest && !originalRequest.retry) {
      originalRequest.retry = true;
      /// attempt to get the new access token
      try {
        const newAccessToken = await refreshAccess();
        if (newAccessToken) {
          /// now if we got new access token we invoke the request again
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return httpClient(originalRequest);
        }
      } catch (refreshErr) {
        if (refreshErr instanceof RefreshError) router.replace("/(auth)");
      }
    }
    return Promise.reject(error);
  },
);

authClient.interceptors.response.use(null, (error: AxiosError) => {
  const config = error.config;
  if (config?.url?.includes("refresh")) {
    return Promise.reject(new RefreshError());
  }
  return Promise.reject(error);
});
