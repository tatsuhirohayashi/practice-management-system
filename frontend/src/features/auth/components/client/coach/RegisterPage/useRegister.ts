"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCoachRegisterMutation } from "@/features/auth/hooks/useCoachRegisterMutation";
import type { RegisterRequest, RegisterUser } from "@/features/auth/types";
import { isAxiosError } from "@/shared/api/globalAxios";
import { coachRoutes } from "@/shared/navigation";

type RegisterFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export function useRegister() {
  const router = useRouter();
  const registerMutation = useCoachRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const onSubmit = async (formData: RegisterFormData) => {
    try {
      const request: RegisterRequest = {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
      };

      const response = await registerMutation.mutateAsync(request);
      const user: RegisterUser = response.data;

      // ユーザー情報が取得できていない場合はエラー
      if (!user || user.id === undefined || user.id === null || !user.email) {
        setError("root", {
          message:
            "会員登録に成功しましたが、ユーザー情報の取得に失敗しました。",
        });
        return;
      }

      // 会員登録成功後、better-authのセッションを作成（ユーザー情報とroleを含む）
      const sessionPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      try {
        const sessionResponse = await fetch("/api/auth/create-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(sessionPayload),
        });

        if (!sessionResponse.ok) {
          const errorData = await sessionResponse.json();
          console.error("セッション作成エラー:", errorData);
        }
      } catch (sessionError) {
        console.error("セッション作成エラー:", sessionError);
      }

      // 会員登録成功時はリダイレクト（コーチ用のページへ）
      router.push(coachRoutes.lesson.reserved);
      router.refresh();
    } catch (error) {
      console.error("会員登録エラー:", error);

      let errorMessage = "会員登録に失敗しました。もう一度お試しください。";

      if (isAxiosError(error)) {
        const errorData = error.response?.data as
          | { message?: string }
          | undefined;
        if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (error.response?.status === 400) {
          errorMessage = "入力内容に誤りがあります。確認してください。";
        } else if (error.response?.status === 409) {
          errorMessage = "このメールアドレスは既に登録されています。";
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
