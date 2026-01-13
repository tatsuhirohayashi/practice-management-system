import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reserveLessonCommandAction } from "@/external/handler/lesson/coach/lesson.command.action";
import {
  coachNotReservedLessonKeys,
  coachReservedLessonKeys,
} from "@/features/lesson/queries/keys";
import type { ReserveLessonRequest } from "@/features/lesson/type";

interface ReserveLessonMutationParams {
  id: number;
  request: ReserveLessonRequest;
}

export function useReserveLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: ReserveLessonMutationParams) =>
      reserveLessonCommandAction(id, request),
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
