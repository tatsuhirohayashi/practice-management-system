import { useQuery } from "@tanstack/react-query";
import { listNotReservedLessonQueryAction } from "@/external/handler/lesson/client/lesson.query.action";
import { clientNotReservedLessonKeys } from "@/features/lesson/queries/keys";

export function useLessonNotReservedListQuery() {
  return useQuery({
    queryKey: clientNotReservedLessonKeys.all,
    queryFn: () => listNotReservedLessonQueryAction(),
  });
}

