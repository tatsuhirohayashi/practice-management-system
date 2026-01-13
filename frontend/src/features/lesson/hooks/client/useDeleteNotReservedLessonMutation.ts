import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotReservedLessonCommandAction } from "@/external/handler/lesson/client/lesson.command.action";
import { clientNotReservedLessonKeys } from "@/features/lesson/queries/keys";

export function useDeleteNotReservedLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteNotReservedLessonCommandAction(id),
    onSuccess: () => {
      // リストを再取得
      queryClient.invalidateQueries({
        queryKey: clientNotReservedLessonKeys.all,
      });
    },
  });
}
