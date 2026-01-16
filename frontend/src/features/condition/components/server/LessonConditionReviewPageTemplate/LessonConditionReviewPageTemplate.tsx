import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getCoachLessonConditionReviewQuery } from "@/external/handler/condition/coach/condition.query.server";
import { coachLessonConditionReviewKeys } from "@/features/condition/queries/keys";
import { getQueryClient } from "@/shared/lib/query-client";
import { LessonConditionReview } from "../../client/coach/LessonConditionReview";

interface LessonConditionReviewPageTemplateProps {
  lessonId: number;
}

export async function LessonConditionReviewPageTemplate({
  lessonId,
}: LessonConditionReviewPageTemplateProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: coachLessonConditionReviewKeys.detail(lessonId),
    queryFn: () => getCoachLessonConditionReviewQuery(lessonId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LessonConditionReview lessonId={lessonId} />
    </HydrationBoundary>
  );
}
