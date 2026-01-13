"use server";

import {
  fetchClientReviewDetail,
  fetchClientReviewList,
} from "@/external/service/review/client/review.service";
import { withAuth } from "@/features/auth/servers/auth.guard";

export async function listClientReviewQueryAction() {
  return withAuth(({ user_id }) => fetchClientReviewList(user_id), "client");
}

export async function getClientReviewDetailQueryAction(id: number) {
  return withAuth(
    ({ user_id }) => fetchClientReviewDetail(id, user_id),
    "client",
  );
}
