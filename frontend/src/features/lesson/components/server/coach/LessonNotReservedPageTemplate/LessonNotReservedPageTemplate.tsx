import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { listCoachNotReservedLessonQuery } from "@/external/handler/lesson/coach/lesson.query.server";
import { coachNotReservedLessonKeys } from "@/features/lesson/queries/keys";
import { getQueryClient } from "@/shared/lib/query-client";
import { LessonNotReservedList } from "../../../client/coach/LessonNotReservedList";

export async function LessonNotReservedListPageTemplate() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: coachNotReservedLessonKeys.all,
    queryFn: () => listCoachNotReservedLessonQuery(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LessonNotReservedList />
    </HydrationBoundary>
  );
}

