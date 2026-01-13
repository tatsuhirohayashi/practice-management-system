import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotReservedLessonCommandAction } from "@/external/handler/lesson/client/lesson.command.action";
import { clientNotReservedLessonKeys } from "@/features/lesson/queries/keys";
import type { UpdateNotReservedLessonRequest } from "@/features/lesson/type";

export function useUpdateNotReservedLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: number;
      request: UpdateNotReservedLessonRequest;
    }) => updateNotReservedLessonCommandAction(id, request),
    onSuccess: () => {
      // リストを再取得
      queryClient.invalidateQueries({
        queryKey: clientNotReservedLessonKeys.all,
      });
    },
  });
}
