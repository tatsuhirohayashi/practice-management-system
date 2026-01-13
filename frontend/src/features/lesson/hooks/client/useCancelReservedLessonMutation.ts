import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelReservedLessonCommandAction } from "@/external/handler/lesson/client/lesson.command.action";
import { clientReservedLessonKeys } from "@/features/lesson/queries/keys";

export function useCancelReservedLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => cancelReservedLessonCommandAction(id),
    onSuccess: () => {
      // リストを再取得
      queryClient.invalidateQueries({
        queryKey: clientReservedLessonKeys.all,
      });
    },
  });
}
