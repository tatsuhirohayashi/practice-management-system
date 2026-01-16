import { useQuery } from "@tanstack/react-query";
import { listCoachReservedLessonQueryAction } from "@/external/handler/lesson/coach/lesson.query.action";
import { coachReservedLessonKeys } from "@/features/lesson/queries/keys";

export function useLessonReservedListQuery() {
  return useQuery({
    queryKey: coachReservedLessonKeys.all,
    queryFn: () => listCoachReservedLessonQueryAction(),
  });
}
