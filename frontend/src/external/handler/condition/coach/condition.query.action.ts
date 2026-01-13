"use server";

import { fetchCoachLessonConditionReview } from "@/external/service/condition/coach/condition.service";
import { withAuth } from "@/features/auth/servers/auth.guard";

export async function getCoachLessonConditionReviewQueryAction(id: number) {
  return withAuth(
    ({ user_id }) => fetchCoachLessonConditionReview(id, user_id),
    "coach",
  );
}
