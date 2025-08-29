import baseAxios from "axios";
import type { AxiosInstance } from "axios";

export const BASE_URL: string = import.meta.env.VITE_API_URL as string;

const axios: AxiosInstance = baseAxios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
