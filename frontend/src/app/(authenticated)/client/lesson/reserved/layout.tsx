import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "クライアント側の予約されたレッスン一覧",
  description: "クライアント側の予約されたレッスン一覧が表示されます",
};

export default function ClientLessonReservedLayout({
  children,
}: LayoutProps<"/client/lesson/reserved">) {
  return <>{children}</>;
}
