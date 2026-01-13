import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "クライアント側のレッスン候補日時の一覧",
  description: "クライアント側のレッスン候補日時の一覧が表示されます",
};

export default function ClientLessonNotReservedLayout({
  children,
}: LayoutProps<"/client/lesson/notreserved">) {
  return <>{children}</>;
}
