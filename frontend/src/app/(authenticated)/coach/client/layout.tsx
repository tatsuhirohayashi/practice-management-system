import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーチ側のクライアント管理",
  description: "コーチ側のクライアント管理が表示されます",
};

export default function CoachClientLayout({
  children,
}: LayoutProps<"/coach/client">) {
  return <>{children}</>;
}
