import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCoachClientCommandAction } from "@/external/handler/user/coach-client.query.action";
import { coachClientKeys } from "../../queries/keys";
import type { CreateClientRequest } from "../../type";

export function useCreateClientMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateClientRequest) =>
      createCoachClientCommandAction(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: coachClientKeys.all,
      });
    },
  });
}

