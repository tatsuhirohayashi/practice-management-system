import { useQuery } from "@tanstack/react-query";
import { listClientReviewQueryAction } from "@/external/handler/review/client/review.query.action";
import { clientReviewKeys } from "../../queries/keys";

export function useReviewListQuery() {
  return useQuery({
    queryKey: clientReviewKeys.all,
    queryFn: () => listClientReviewQueryAction(),
  });
}

