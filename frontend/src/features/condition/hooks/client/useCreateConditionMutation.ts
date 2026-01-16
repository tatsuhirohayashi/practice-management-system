import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConditionCommandAction } from "@/external/handler/condition/client/condition.command.action";
import { clientConditionKeys } from "../../queries/keys";
import type { CreateConditionRequest } from "../../type";

export function useCreateConditionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateConditionRequest) =>
      createConditionCommandAction(request),
    onSuccess: () => {
      // リストを再取得
      queryClient.invalidateQueries({
        queryKey: clientConditionKeys.all,
      });
    },
  });
}
