import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unconfirmReservedLessonCommandAction } from "@/external/handler/lesson/client/lesson.command.action";
import { clientReservedLessonKeys } from "@/features/lesson/queries/keys";

export function useUnconfirmReservedLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => unconfirmReservedLessonCommandAction(id),
    onSuccess: () => {
      // リストを再取得
      queryClient.invalidateQueries({
        queryKey: clientReservedLessonKeys.all,
      });
    },
  });
}
