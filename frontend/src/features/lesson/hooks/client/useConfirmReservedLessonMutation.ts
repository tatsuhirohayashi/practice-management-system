import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmReservedLessonCommandAction } from "@/external/handler/lesson/client/lesson.command.action";
import { clientReservedLessonKeys } from "@/features/lesson/queries/keys";

export function useConfirmReservedLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => confirmReservedLessonCommandAction(id),
    onSuccess: () => {
      // リストを再取得
      queryClient.invalidateQueries({
        queryKey: clientReservedLessonKeys.all,
      });
    },
  });
}
