"use server";

import {
  fetchCoachNotReservedLesson,
  fetchCoachReservedLesson,
} from "@/external/service/lesson/coach/lesson.service";
import { withAuth } from "@/features/auth/servers/auth.guard";

export async function listCoachReservedLessonQueryAction() {
  return withAuth(({ user_id }) => fetchCoachReservedLesson(user_id), "coach");
}

export async function listCoachNotReservedLessonQueryAction() {
  return withAuth(
    ({ user_id }) => fetchCoachNotReservedLesson(user_id),
    "coach",
  );
}
