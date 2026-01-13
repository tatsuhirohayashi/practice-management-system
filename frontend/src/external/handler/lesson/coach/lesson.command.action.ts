"use server";

import {
  cancelCoachReservedLessonCommand,
  notReserveCommand,
  reserveLessonCommand,
} from "@/external/service/lesson/coach/lesson.service";
import { withAuth } from "@/features/auth/servers/auth.guard";
import type { ReserveLessonRequest } from "@/features/lesson/type";

// Coach Reserved Lesson Commands
export async function cancelCoachReservedLessonCommandAction(id: number) {
  return withAuth(
    ({ user_id }) => cancelCoachReservedLessonCommand(id, user_id),
    "coach",
  );
}

// Coach Not Reserved Lesson Commands
export async function reserveLessonCommandAction(
  id: number,
  request: ReserveLessonRequest,
) {
  return withAuth(
    ({ user_id }) => reserveLessonCommand(id, request, user_id),
    "coach",
  );
}

export async function notReserveCommandAction(id: number) {
  return withAuth(({ user_id }) => notReserveCommand(id, user_id), "coach");
}
