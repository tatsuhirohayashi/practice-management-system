import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "クライアント側の振り返り詳細",
  description: "クライアント側の振り返り詳細が表示されます",
};

export default function ClientReviewDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
