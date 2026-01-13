"use client";

import type { useForm } from "react-hook-form";
import type { ClientType } from "@/features/user/type";
import { FormLabel } from "@/shared/components/custom";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { formatUserNameFromUser } from "@/shared/lib/user";

interface ClientManagementPresenterProps {
  clients: ClientType[];
  isLoading: boolean;
  register: ReturnType<typeof useForm<ClientFormData>>["register"];
  handleSubmit: ReturnType<typeof useForm<ClientFormData>>["handleSubmit"];
  errors: ReturnType<typeof useForm<ClientFormData>>["formState"]["errors"];
  onSubmit: (data: ClientFormData) => void;
}

type ClientFormData = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export function ClientManagementPresenter({
  clients,
  isLoading,
  register,
  handleSubmit,
  errors,
  onSubmit,
}: ClientManagementPresenterProps) {
  return (
    <div className="px-12 py-2">
      <h1 className="text-3xl font-bold mb-2">○クライアント管理</h1>

      {/* クライアント管理フォーム */}
      <div className="border-2 border-black px-4 py-4 mb-6 bg-white">
        <h2 className="text-xl font-bold mb-4">○クライアント登録</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <FormLabel required>○Email</FormLabel>
            <Input
              type="email"
              className="w-full bg-white"
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
            <FormLabel required>○名前</FormLabel>
            <div className="flex gap-4">
              <Input
                type="text"
                className="flex-1 bg-white"
                placeholder="姓を入力"
                {...register("last_name", {
                  required: "姓は必須です",
                })}
              />
              <Input
                type="text"
                className="flex-1 bg-white"
                placeholder="名を入力"
                {...register("first_name", {
                  required: "名は必須です",
                })}
              />
            </div>
            {errors.last_name && (
              <p className="text-sm text-red-500">
                {errors.last_name.message as string}
              </p>
            )}
            {errors.first_name && (
              <p className="text-sm text-red-500">
                {errors.first_name.message as string}
              </p>
            )}
          </div>

          {/* パスワード */}
          <div className="space-y-2">
            <FormLabel required>○パスワード</FormLabel>
            <Input
              type="password"
              className="w-full bg-white"
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

          {/* 登録ボタン */}
          <div className="flex justify-center">
            <Button type="submit" className="bg-blue-500 text-white px-8">
              登録
            </Button>
          </div>
        </form>
      </div>

      {/* クライアント一覧 */}
      <div className="border-2 border-black px-4 py-4 bg-white">
        <h2 className="text-xl font-bold mb-4">○クライアント一覧</h2>
        {isLoading ? (
          <div>読み込み中...</div>
        ) : clients.length === 0 ? (
          <p className="text-sm text-gray-500">
            クライアントが登録されていません
          </p>
        ) : (
          <div className="space-y-2">
            {clients.map((client) => (
              <div
                key={client.id}
                className="border border-gray-300 px-4 py-2 rounded"
              >
                <span className="text-base">
                  ⚫︎{formatUserNameFromUser(client, { withHonorific: true })}　{client.email}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

