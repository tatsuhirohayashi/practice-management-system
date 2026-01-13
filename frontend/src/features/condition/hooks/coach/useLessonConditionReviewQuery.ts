import { useQuery } from "@tanstack/react-query";
import { getCoachLessonConditionReviewQueryAction } from "@/external/handler/condition/coach/condition.query.action";
import { coachLessonConditionReviewKeys } from "../../queries/keys";

export function useLessonConditionReviewQuery(id: number) {
  return useQuery({
    queryKey: coachLessonConditionReviewKeys.detail(id),
    queryFn: () => getCoachLessonConditionReviewQueryAction(id),
    enabled: !!id,
  });
}

