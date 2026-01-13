import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReviewCommandAction } from "@/external/handler/review/client/review.command.action";
import { clientReviewKeys } from "../../queries/keys";
import type { UpdateReviewRequest } from "../../type";

interface UpdateReviewMutationParams {
  id: number;
  request: UpdateReviewRequest;
}

export function useUpdateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: UpdateReviewMutationParams) =>
      updateReviewCommandAction(id, request),
    onSuccess: (_, variables) => {
      // リストと詳細を再取得
      queryClient.invalidateQueries({
        queryKey: clientReviewKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: clientReviewKeys.detail(variables.id),
      });
    },
  });
}
