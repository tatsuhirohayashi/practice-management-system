import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uncancelReservedLessonCommandAction } from "@/external/handler/lesson/client/lesson.command.action";
import { clientReservedLessonKeys } from "@/features/lesson/queries/keys";

export function useUncancelReservedLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => uncancelReservedLessonCommandAction(id),
    onSuccess: () => {
      // リストを再取得
      queryClient.invalidateQueries({
        queryKey: clientReservedLessonKeys.all,
      });
    },
  });
}
