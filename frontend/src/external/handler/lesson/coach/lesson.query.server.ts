import "server-only";

import {
  fetchCoachNotReservedLesson,
  fetchCoachReservedLesson,
} from "@/external/service/lesson/coach/lesson.service";
import { withAuth } from "@/features/auth/servers/auth.guard";
import type {
  NotReservedLessonListType,
  ReservedLessonListType,
} from "@/features/lesson/type";

export const listCoachReservedLessonQuery =
  (): Promise<ReservedLessonListType> => {
    return withAuth(
      ({ user_id }) => fetchCoachReservedLesson(user_id),
      "coach",
    );
  };

export const listCoachNotReservedLessonQuery =
  (): Promise<NotReservedLessonListType> => {
    return withAuth(
      ({ user_id }) => fetchCoachNotReservedLesson(user_id),
      "coach",
    );
  };
