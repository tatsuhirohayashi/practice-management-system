"use server";

import {
  cancelReservedLessonCommand,
  confirmReservedLessonCommand,
  createNotReservedLessonCommand,
  createNotReservedLessonsCommand,
  deleteNotReservedLessonCommand,
  uncancelReservedLessonCommand,
  unconfirmReservedLessonCommand,
  updateNotReservedLessonCommand,
} from "@/external/service/lesson/client/lesson.service";
import { withAuth } from "@/features/auth/servers/auth.guard";
import type {
  CreateNotReservedLessonRequest,
  CreateNotReservedLessonsRequest,
  UpdateNotReservedLessonRequest,
} from "@/features/lesson/type";

// Reserved Lesson Commands
export async function confirmReservedLessonCommandAction(id: number) {
  return withAuth(
    ({ user_id }) => confirmReservedLessonCommand(id, user_id),
    "client",
  );
}

export async function unconfirmReservedLessonCommandAction(id: number) {
  return withAuth(
    ({ user_id }) => unconfirmReservedLessonCommand(id, user_id),
    "client",
  );
}

export async function cancelReservedLessonCommandAction(id: number) {
  return withAuth(
    ({ user_id }) => cancelReservedLessonCommand(id, user_id),
    "client",
  );
}

export async function uncancelReservedLessonCommandAction(id: number) {
  return withAuth(
    ({ user_id }) => uncancelReservedLessonCommand(id, user_id),
    "client",
  );
}

// Not Reserved Lesson Commands
export async function createNotReservedLessonCommandAction(
  request: CreateNotReservedLessonRequest,
) {
  return withAuth(
    ({ user_id }) => createNotReservedLessonCommand(request, user_id),
    "client",
  );
}

export async function createNotReservedLessonsCommandAction(
  request: CreateNotReservedLessonsRequest,
) {
  return withAuth(
    ({ user_id }) => createNotReservedLessonsCommand(request, user_id),
    "client",
  );
}

export async function updateNotReservedLessonCommandAction(
  id: number,
  request: UpdateNotReservedLessonRequest,
) {
  return withAuth(
    ({ user_id }) => updateNotReservedLessonCommand(id, request, user_id),
    "client",
  );
}

export async function deleteNotReservedLessonCommandAction(id: number) {
  return withAuth(
    ({ user_id }) => deleteNotReservedLessonCommand(id, user_id),
    "client",
  );
}
