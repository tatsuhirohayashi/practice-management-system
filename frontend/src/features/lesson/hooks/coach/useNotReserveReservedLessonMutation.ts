import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notReserveCommandAction } from "@/external/handler/lesson/coach/lesson.command.action";
import { coachNotReservedLessonKeys } from "@/features/lesson/queries/keys";
import { coachReservedLessonKeys } from "@/features/lesson/queries/keys";

export function useNotReserveReservedLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => notReserveCommandAction(id),
    onSuccess: () => {
      // 予約済みリストを再取得
      queryClient.invalidateQueries({
        queryKey: coachReservedLessonKeys.all,
      });
      // レッスン候補のリストも再取得
      queryClient.invalidateQueries({
        queryKey: coachNotReservedLessonKeys.all,
      });
    },
  });
}
