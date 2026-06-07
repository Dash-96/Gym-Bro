import { InternalAxiosRequestConfig } from "axios";

export type retryRequestConfig = InternalAxiosRequestConfig & {
  retry: boolean;
};
