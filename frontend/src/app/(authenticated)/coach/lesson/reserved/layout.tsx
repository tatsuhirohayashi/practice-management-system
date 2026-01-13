import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーチ側の予約されたレッスン一覧",
  description: "コーチ側の予約されたレッスン一覧が表示されます",
};

export default function CoachLessonReservedLayout({
  children,
}: LayoutProps<"/coach/lesson/reserved">) {
  return <>{children}</>;
}
