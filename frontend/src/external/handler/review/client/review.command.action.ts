"use server";

import {
  createReviewCommand,
  updateReviewCommand,
} from "@/external/service/review/client/review.service";
import { withAuth } from "@/features/auth/servers/auth.guard";
import type {
  CreateReviewRequest,
  UpdateReviewRequest,
} from "@/features/review/type";

export async function createReviewCommandAction(request: CreateReviewRequest) {
  return withAuth(
    ({ user_id }) => createReviewCommand(request, user_id),
    "client",
  );
}

export async function updateReviewCommandAction(
  id: number,
  request: UpdateReviewRequest,
) {
  return withAuth(
    ({ user_id }) => updateReviewCommand(id, request, user_id),
    "client",
  );
}
