import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { listCoachReservedLessonQuery } from "@/external/handler/lesson/coach/lesson.query.server";
import { coachReservedLessonKeys } from "@/features/lesson/queries/keys";
import { getQueryClient } from "@/shared/lib/query-client";
import { LessonReservedList } from "../../../client/coach/LessonReservedList";

export async function LessonReservedListPageTemplate() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: coachReservedLessonKeys.all,
    queryFn: () => listCoachReservedLessonQuery(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LessonReservedList />
    </HydrationBoundary>
  );
}
