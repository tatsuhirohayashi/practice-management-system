import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン（コーチ側）",
  description: "ログイン（コーチ側）してレッスンを管理しましょう",
};

export default function CoachLoginLayout({
  children,
}: LayoutProps<"/coach/login">) {
  return <>{children}</>;
}
