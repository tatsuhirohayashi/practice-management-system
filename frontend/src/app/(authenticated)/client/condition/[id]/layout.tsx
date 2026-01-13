import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "クライアント側のコンディション詳細",
  description: "クライアント側のコンディション詳細が表示されます",
};

export default function ClientConditionDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
