import "server-only";
import axios, { type AxiosError } from "axios";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Server Actions / Server Components用のaxiosインスタンス
// localStorageは使えないため、認証情報はCookieから取得する
const serverApiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default serverApiClient;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAxiosError = (error: any): error is AxiosError =>
  !!error.isAxiosError;
