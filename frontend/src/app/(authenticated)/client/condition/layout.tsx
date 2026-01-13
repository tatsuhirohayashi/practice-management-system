import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "クライアント側のコンディション一覧",
  description: "クライアント側のコンディション一覧が表示されます",
};

export default function ClientConditionLayout({
  children,
}: LayoutProps<"/client/condition">) {
  return <>{children}</>;
}
