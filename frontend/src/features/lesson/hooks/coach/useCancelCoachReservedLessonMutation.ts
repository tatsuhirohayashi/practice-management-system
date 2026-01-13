import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelCoachReservedLessonCommandAction } from "@/external/handler/lesson/coach/lesson.command.action";
import { coachReservedLessonKeys } from "@/features/lesson/queries/keys";

export function useCancelCoachReservedLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => cancelCoachReservedLessonCommandAction(id),
    onSuccess: () => {
      // リストを再取得
      queryClient.invalidateQueries({
        queryKey: coachReservedLessonKeys.all,
      });
    },
  });
}
