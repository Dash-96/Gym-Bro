import axios from "axios";
import { getTokenAsync } from "../secureStore";

const accessToken = getTokenAsync();
console.log(accessToken);

export const httpClient = axios.create({ baseURL: "http://10.223.146.241:5276/api" });

//= Add access token to requests
httpClient.interceptors.request.use(async (config) => {
  const token = await getTokenAsync();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
