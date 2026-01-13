import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "会員登録（コーチ側）",
  description: "会員登録（コーチ側）してレッスンを管理しましょう",
};

export default function CoachRegisterLayout({
  children,
}: LayoutProps<"/coach/register">) {
  return <>{children}</>;
}
