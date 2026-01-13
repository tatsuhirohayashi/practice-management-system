import { LessonConditionReviewPageTemplate } from "@/features/condition/components/server/LessonConditionReviewPageTemplate/LessonConditionReviewPageTemplate";

interface CoachLessonConditionReviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function CoachLessonConditionReviewPage({
  params,
}: CoachLessonConditionReviewPageProps) {
  const { id } = await params;
  const lessonId = Number(id);

  return <LessonConditionReviewPageTemplate lessonId={lessonId} />;
}
