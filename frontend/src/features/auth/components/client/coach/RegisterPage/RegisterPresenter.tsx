"use client";

import Link from "next/link";
import type { useForm } from "react-hook-form";
import { FormLabel } from "@/shared/components/custom";
import { coachRoutes } from "@/shared/navigation";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

type RegisterFormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

interface RegisterPresenterProps {
  register: ReturnType<typeof useForm<RegisterFormData>>["register"];
  handleSubmit: ReturnType<typeof useForm<RegisterFormData>>["handleSubmit"];
  errors: ReturnType<typeof useForm<RegisterFormData>>["formState"]["errors"];
  onSubmit: (data: RegisterFormData) => void;
}

export function RegisterPresenter({
  register,
  handleSubmit,
  errors,
  onSubmit,
}: RegisterPresenterProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="border-2 border-black px-8 py-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">会員登録</h1>

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

          {/* 名前 */}
          <div className="space-y-2">
            <FormLabel>名前</FormLabel>
            <div className="flex gap-2">
              <Input
                type="text"
                className="w-full"
                placeholder="姓"
                {...register("lastName", {
                  required: "姓は必須です",
                })}
              />
              <Input
                type="text"
                className="w-full"
                placeholder="名"
                {...register("firstName", {
                  required: "名は必須です",
                })}
              />
            </div>
            {errors.lastName && (
              <p className="text-sm text-red-500">
                {errors.lastName.message as string}
              </p>
            )}
            {errors.firstName && (
              <p className="text-sm text-red-500">
                {errors.firstName.message as string}
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
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上で入力してください",
                },
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

          {/* 会員登録ボタン */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="bg-blue-500 text-white px-8 w-full"
            >
              会員登録
            </Button>
          </div>
        </form>

        {/* ログインへのリンク */}
        <div className="mt-4 text-center">
          <Link
            href={coachRoutes.login}
            className="text-sm text-blue-600 hover:underline"
          >
            ログインはこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
