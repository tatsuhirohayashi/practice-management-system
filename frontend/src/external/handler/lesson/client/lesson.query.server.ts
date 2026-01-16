import "server-only";

import {
  fetchNotReservedLesson,
  fetchReservedLesson,
} from "@/external/service/lesson/client/lesson.service";
import { withAuth } from "@/features/auth/servers/auth.guard";
import type {
  NotReservedLessonListType,
  ReservedLessonListType,
} from "@/features/lesson/type";

export const listReservedLessonQuery = (): Promise<ReservedLessonListType> => {
  return withAuth(({ user_id }) => fetchReservedLesson(user_id), "client");
};

export const listNotReservedLessonQuery =
  (): Promise<NotReservedLessonListType> => {
    return withAuth(({ user_id }) => fetchNotReservedLesson(user_id), "client");
  };
