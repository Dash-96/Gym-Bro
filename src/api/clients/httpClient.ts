import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshAccess } from "../authApi";
import { getTokenAsync } from "../secureStore";

const accessToken = getTokenAsync();
console.log(accessToken);

export const httpClient = axios.create({ baseURL: "http://10.223.146.241:5276/api" });

//= Add access token to requests
httpClient.interceptors.request.use(async (config) => {
  const token = await getTokenAsync();
  // console.log(token);
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
});

//= Handle authentication failure
httpClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error: AxiosError) => {
    // const originalRequest = error.config as retryRequestConfig;
    const originalRequest = error.config as InternalAxiosRequestConfig;
    if (error.response?.status === 401 && originalRequest.url != "/refresh") {
      // originalRequest.retry = true;
      /// attempt to get the new access token
      try {
        const newAccessToken = await refreshAccess();
        if (newAccessToken) {
          /// now if we got new access token we invoke the request again
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return httpClient(originalRequest);
        }
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
        // router.replace("/(auth)");
      }
    }
    return Promise.reject(error);
  },
);
