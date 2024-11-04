// utils/axiosConfig.js
import axios from 'axios';
import { AxiosError, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export default axiosInstance;
export type { AxiosError, AxiosRequestConfig };
