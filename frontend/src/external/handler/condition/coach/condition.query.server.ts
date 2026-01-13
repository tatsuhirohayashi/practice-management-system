import "server-only";

import { fetchCoachLessonConditionReview } from "@/external/service/condition/coach/condition.service";
import { withAuth } from "@/features/auth/servers/auth.guard";
import type { LessonConditionReviewResponse } from "@/features/condition/type";

export const getCoachLessonConditionReviewQuery = (
  id: number,
): Promise<LessonConditionReviewResponse> => {
  return withAuth(
    ({ user_id }) => fetchCoachLessonConditionReview(id, user_id),
    "coach",
  );
};
