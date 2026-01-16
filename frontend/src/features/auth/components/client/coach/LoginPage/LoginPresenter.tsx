"use client";

import Link from "next/link";
import type { useForm } from "react-hook-form";
import { FormLabel } from "@/shared/components/custom";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { coachRoutes } from "@/shared/navigation";

type LoginFormData = {
  email: string;
  password: string;
};

interface LoginPresenterProps {
  register: ReturnType<typeof useForm<LoginFormData>>["register"];
  handleSubmit: ReturnType<typeof useForm<LoginFormData>>["handleSubmit"];
  errors: ReturnType<typeof useForm<LoginFormData>>["formState"]["errors"];
  onSubmit: (data: LoginFormData) => void;
}

export function LoginPresenter({
  register,
  handleSubmit,
  errors,
  onSubmit,
}: LoginPresenterProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="border-2 border-black px-8 py-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">コーチログイン</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              className="w-full"
              placeholder="Emailを入力"
              {...register("email", {
                required: "Emailは必須です",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "有効なEmailアドレスを入力してください",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* パスワード */}
          <div className="space-y-2">
            <FormLabel>パスワード</FormLabel>
            <Input
              type="password"
              className="w-full"
              placeholder="パスワードを入力"
              {...register("password", {
                required: "パスワードは必須です",
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message as string}
              </p>
            )}
          </div>

          {/* エラーメッセージ */}
          {errors.root && (
            <p className="text-sm text-red-500">
              {errors.root.message as string}
            </p>
          )}

          {/* ログインボタン */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="bg-blue-500 text-white px-8 w-full"
            >
              ログイン
            </Button>
          </div>
        </form>

        {/* 会員登録へのリンク */}
        <div className="mt-4 text-center">
          <Link
            href={coachRoutes.register}
            className="text-sm text-blue-600 hover:underline"
          >
            会員登録はこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
