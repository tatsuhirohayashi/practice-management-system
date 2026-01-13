"use client";

import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // 現在のパスからroleを判定してホームリンクを決定
  const homeLink = useMemo(() => {
    return pathname?.startsWith("/coach")
      ? "/coach/lesson/reserved"
      : "/client/lesson/reserved";
  }, [pathname]);

  const handleSignOut = useCallback(async () => {
    try {
      // ログアウトAPIを呼び出してセッションを削除
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      // キャッシュをすべてクリア
      queryClient.clear();

      // APIレスポンスからログインページのパスを取得、なければ現在のパスから判定
      const loginPath =
        data.loginPath ||
        (pathname?.startsWith("/coach") ? "/coach/login" : "/client/login");

      router.push(loginPath);
      router.refresh();
    } catch (error) {
      console.error("ログアウトエラー:", error);
      // エラーが発生した場合は現在のパスから判定してログインページにリダイレクト
      const loginPath = pathname?.startsWith("/coach")
        ? "/coach/login"
        : "/client/login";
      router.push(loginPath);
      router.refresh();
    }
  }, [router, queryClient, pathname]);

  return {
    handleSignOut,
    homeLink,
  };
}
