import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { listReservedLessonQuery } from "@/external/handler/lesson/client/lesson.query.server";
import { clientReservedLessonKeys } from "@/features/lesson/queries/keys";
import { getQueryClient } from "@/shared/lib/query-client";
import { LessonReservedList } from "../../../client/client/LessonReservedList";

export async function LessonReservedListPageTemplate() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: clientReservedLessonKeys.all,
    queryFn: () => listReservedLessonQuery(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LessonReservedList />
    </HydrationBoundary>
  );
}
