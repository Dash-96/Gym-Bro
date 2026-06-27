import { RefreshError } from "@/src/utils/customError";
import axios, { AxiosError } from "axios";

export const authClient = axios.create({ baseURL: "http://10.223.146.241:5276/api/auth" });

authClient.interceptors.response.use(null, (error: AxiosError) => {
  const config = error.config;
  if (config?.url?.includes("refresh")) {
    return Promise.reject(new RefreshError());
  }
  return Promise.reject(error);
});
