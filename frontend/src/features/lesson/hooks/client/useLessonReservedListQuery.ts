import { useQuery } from "@tanstack/react-query";
import { listReservedLessonQueryAction } from "@/external/handler/lesson/client/lesson.query.action";
import { clientReservedLessonKeys } from "@/features/lesson/queries/keys";

export function useLessonReservedListQuery() {
  return useQuery({
    queryKey: clientReservedLessonKeys.all,
    queryFn: () => listReservedLessonQueryAction(),
  });
}
