import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーチ側のレッスン候補日時一覧",
  description: "コーチ側のレッスン候補日時一覧が表示されます",
};

export default function CoachLessonNotReservedLayout({
  children,
}: LayoutProps<"/coach/lesson/notreserved">) {
  return <>{children}</>;
}
