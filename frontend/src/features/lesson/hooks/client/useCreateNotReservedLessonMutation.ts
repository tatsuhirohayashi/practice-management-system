import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotReservedLessonCommandAction } from "@/external/handler/lesson/client/lesson.command.action";
import { clientNotReservedLessonKeys } from "@/features/lesson/queries/keys";
import type { CreateNotReservedLessonRequest } from "@/features/lesson/type";

export function useCreateNotReservedLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateNotReservedLessonRequest) =>
      createNotReservedLessonCommandAction(request),
    onSuccess: () => {
      // リストを再取得
      queryClient.invalidateQueries({
        queryKey: clientNotReservedLessonKeys.all,
      });
    },
  });
}
