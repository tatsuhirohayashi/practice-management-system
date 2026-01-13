import axios, { type AxiosError } from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const getToken = () => localStorage.getItem("authentication") || null;

//全てのAPI通信で共通する設定をまとめておくためのインスタンス
const apiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//全てのAPIリクエストに、トークンを自動で付ける仕組み
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const setAxiosAuthentication = (token: string) => {
  localStorage.setItem("authentication", token);
  apiClient.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeAxiosAuthentication = () => {
  localStorage.removeItem("authentication");
  delete apiClient.defaults.headers.Authorization;
};

export default apiClient;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAxiosError = (error: any): error is AxiosError =>
  !!error.isAxiosError;
