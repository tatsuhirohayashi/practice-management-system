import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReviewCommandAction } from "@/external/handler/review/client/review.command.action";
import { clientReviewKeys } from "../../queries/keys";
import type { CreateReviewRequest } from "../../type";

export function useCreateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateReviewRequest) =>
      createReviewCommandAction(request),
    onSuccess: () => {
      // リストを再取得
      queryClient.invalidateQueries({
        queryKey: clientReviewKeys.all,
      });
    },
  });
}
