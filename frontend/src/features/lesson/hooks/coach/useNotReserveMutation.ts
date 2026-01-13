import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notReserveCommandAction } from "@/external/handler/lesson/coach/lesson.command.action";
import {
  coachNotReservedLessonKeys,
  coachReservedLessonKeys,
} from "@/features/lesson/queries/keys";

export function useNotReserveMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => notReserveCommandAction(id),
    onSuccess: () => {
      // 未予約リストと予約済みリストを再取得
      queryClient.invalidateQueries({
        queryKey: coachNotReservedLessonKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: coachReservedLessonKeys.all,
      });
    },
  });
}
