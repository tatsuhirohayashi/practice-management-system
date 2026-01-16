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

export const isAxiosError = (error: unknown): error is AxiosError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as { isAxiosError: unknown }).isAxiosError === true
  );
};
