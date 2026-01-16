import { useQuery } from "@tanstack/react-query";
import { listCoachNotReservedLessonQueryAction } from "@/external/handler/lesson/coach/lesson.query.action";
import { coachNotReservedLessonKeys } from "@/features/lesson/queries/keys";

export function useLessonNotReservedListQuery() {
  return useQuery({
    queryKey: coachNotReservedLessonKeys.all,
    queryFn: () => listCoachNotReservedLessonQueryAction(),
  });
}
