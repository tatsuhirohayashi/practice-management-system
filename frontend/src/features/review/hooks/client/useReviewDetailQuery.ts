import { useQuery } from "@tanstack/react-query";
import { getClientReviewDetailQueryAction } from "@/external/handler/review/client/review.query.action";
import { clientReviewKeys } from "../../queries/keys";

export function useReviewDetailQuery(id: number) {
  return useQuery({
    queryKey: clientReviewKeys.detail(id),
    queryFn: () => getClientReviewDetailQueryAction(id),
    enabled: !!id,
  });
}
