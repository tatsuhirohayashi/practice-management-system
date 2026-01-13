import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getClientReviewDetailQuery } from "@/external/handler/review/client/review.query.server";
import { clientReviewKeys } from "@/features/review/queries/keys";
import { getQueryClient } from "@/shared/lib/query-client";
import { ReviewDetail } from "../../../client/client/ReviewDetail";

interface ReviewDetailPageTemplateProps {
  reviewId: number;
}

export async function ReviewDetailPageTemplate({
  reviewId,
}: ReviewDetailPageTemplateProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: clientReviewKeys.detail(reviewId),
    queryFn: () => getClientReviewDetailQuery(reviewId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReviewDetail reviewId={reviewId} />
    </HydrationBoundary>
  );
}

