import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { listClientReviewQuery } from "@/external/handler/review/client/review.query.server";
import { clientReviewKeys } from "@/features/review/queries/keys";
import { getQueryClient } from "@/shared/lib/query-client";
import { ReviewList } from "../../../client/client/ReviewList";

export async function ReviewListPageTemplate() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: clientReviewKeys.all,
    queryFn: () => listClientReviewQuery(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReviewList />
    </HydrationBoundary>
  );
}
