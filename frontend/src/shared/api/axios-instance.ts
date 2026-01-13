import type { AxiosInstance } from "axios";
import globalAxios from "@/shared/api/globalAxios";
import serverAxios from "@/shared/api/serverAxios";

/**
 * 実行環境に応じて適切なaxiosインスタンスを返す
 * Server Actions / Server Componentsの場合はserverAxiosを使用
 * クライアント側の場合はglobalAxiosを使用
 */
export function getAxiosInstance(): AxiosInstance {
  // Server Actions / Server Componentsの場合はserverAxiosを使用
  if (typeof window === "undefined") {
    return serverAxios;
  }
  // クライアント側の場合はglobalAxiosを使用
  return globalAxios;
}
