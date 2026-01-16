import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotReservedLessonsCommandAction } from "@/external/handler/lesson/client/lesson.command.action";
import {
  clientNotReservedLessonKeys,
  coachNotReservedLessonKeys,
} from "@/features/lesson/queries/keys";
import type { CreateNotReservedLessonsRequest } from "@/features/lesson/type";

export function useCreateNotReservedLessonsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateNotReservedLessonsRequest) =>
      createNotReservedLessonsCommandAction(request),
    onSuccess: () => {
      // クライアント側とコーチ側のリストを再取得
      queryClient.invalidateQueries({
        queryKey: clientNotReservedLessonKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: coachNotReservedLessonKeys.all,
      });
    },
  });
}
