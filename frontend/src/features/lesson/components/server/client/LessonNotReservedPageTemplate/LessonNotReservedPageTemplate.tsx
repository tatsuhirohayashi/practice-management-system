import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { listNotReservedLessonQuery } from "@/external/handler/lesson/client/lesson.query.server";
import { clientNotReservedLessonKeys } from "@/features/lesson/queries/keys";
import { getQueryClient } from "@/shared/lib/query-client";
import { LessonNotReservedList } from "../../../client/client/LessonNotReservedList";

export async function LessonNotReservedListPageTemplate() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: clientNotReservedLessonKeys.all,
    queryFn: () => listNotReservedLessonQuery(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LessonNotReservedList />
    </HydrationBoundary>
  );
}

