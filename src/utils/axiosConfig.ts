// utils/axiosConfig.js
import axios from 'axios';
import { AxiosError, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

// src/utils/axiosUtils.ts

export const getAxiosConfig = (cookies: string) => ({
  headers: {
    Cookie: cookies,
  },
});


export default axiosInstance;
export type { AxiosError, AxiosRequestConfig };
