import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "クライアント側の振り返り一覧",
  description: "クライアント側の振り返り一覧が表示されます",
};

export default function ClientReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
