"use server";

import {
  fetchNotReservedLesson,
  fetchReservedLesson,
} from "@/external/service/lesson/client/lesson.service";
import { withAuth } from "@/features/auth/servers/auth.guard";

export async function listReservedLessonQueryAction() {
  return withAuth(({ user_id }) => fetchReservedLesson(user_id), "client");
}

export async function listNotReservedLessonQueryAction() {
  return withAuth(({ user_id }) => fetchNotReservedLesson(user_id), "client");
}
