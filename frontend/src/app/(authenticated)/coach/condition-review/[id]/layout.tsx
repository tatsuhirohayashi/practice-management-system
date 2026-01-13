import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーチ側のコンディション&振り返り",
  description: "コーチ側のコンディション&振り返りが表示されます",
};

export default function CoachConditionReviewLayout({
  children,
}: LayoutProps<"/coach/condition-review/[id]">) {
  return <>{children}</>;
}
