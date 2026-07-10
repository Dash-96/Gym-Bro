import { RefreshError } from "@/src/utils/customError";
import axios, { AxiosError } from "axios";

const AUTH_URL = process.env.EXPO_PUBLIC_API_URL;
export const authClient = axios.create({ baseURL: `${AUTH_URL}/auth` });

authClient.interceptors.response.use(null, (error: AxiosError) => {
  const config = error.config;
  if (config?.url?.includes("refresh")) {
    return Promise.reject(new RefreshError());
  }
  return Promise.reject(error);
});
