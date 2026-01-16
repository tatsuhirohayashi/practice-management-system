import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateConditionCommandAction } from "@/external/handler/condition/client/condition.command.action";
import { clientConditionKeys } from "../../queries/keys";
import type { UpdateConditionRequest } from "../../type";

export function useUpdateConditionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: number;
      request: UpdateConditionRequest;
    }) => updateConditionCommandAction(id, request),
    onSuccess: (_, variables) => {
      // 詳細とリストを再取得
      queryClient.invalidateQueries({
        queryKey: clientConditionKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: clientConditionKeys.all,
      });
    },
  });
}
