import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン（クライアント側）",
  description: "ログイン（クライアント側）してレッスンを管理しましょう",
};

export default function ClientLoginLayout({
  children,
}: LayoutProps<"/client/login">) {
  return <>{children}</>;
}
