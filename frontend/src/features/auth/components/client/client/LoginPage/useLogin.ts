"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useClientLoginMutation } from "@/features/auth/hooks/useClientLoginMutation";
import type { LoginRequest } from "@/features/auth/types";
import { isAxiosError } from "@/shared/api/globalAxios";
import { clientRoutes } from "@/shared/navigation";

type LoginFormData = {
  email: string;
  password: string;
};

export function useLogin() {
  const router = useRouter();
  const loginMutation = useClientLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: LoginFormData) => {
    try {
      const request: LoginRequest = {
        email: formData.email,
        password: formData.password,
      };

      const response = await loginMutation.mutateAsync(request);
      const user = response.data;

      // ユーザー情報が取得できていない場合はエラー
      // idが0の場合も有効なので、undefined/nullのみをチェック
      if (!user || user.id === undefined || user.id === null || !user.email) {
        setError("root", {
          message:
            "ログインに成功しましたが、ユーザー情報の取得に失敗しました。",
        });
        return;
      }

      // ログイン成功後、better-authのセッションを作成（ユーザー情報とroleを含む）
      const sessionPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      try {
        const response = await fetch("/api/auth/create-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Cookieを送受信するために必要
          body: JSON.stringify(sessionPayload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("セッション作成エラー:", errorData);
          // セッション作成に失敗してもログインは成功しているので続行
        }
      } catch (sessionError) {
        console.error("セッション作成エラー:", sessionError);
        // セッション作成に失敗してもログインは成功しているので続行
      }

      // ログイン成功時はリダイレクト
      router.push(clientRoutes.lesson.reserved);
      router.refresh();
    } catch (error) {
      console.error("ログインエラー:", error);

      let errorMessage = "ログインに失敗しました。もう一度お試しください。";

      if (isAxiosError(error)) {
        const errorData = error.response?.data as
          | { message?: string }
          | undefined;
        if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (error.response?.status === 401) {
          errorMessage = "メールアドレスまたはパスワードが正しくありません。";
        }
      }

      setError("root", {
        message: errorMessage,
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
