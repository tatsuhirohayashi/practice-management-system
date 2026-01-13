import "server-only";

import {
  fetchClientReviewDetail,
  fetchClientReviewList,
} from "@/external/service/review/client/review.service";
import { withAuth } from "@/features/auth/servers/auth.guard";
import type {
  ReviewDetailResponse,
  ReviewLessonListType,
} from "@/features/review/type";

export const listClientReviewQuery = (): Promise<ReviewLessonListType> => {
  return withAuth(({ user_id }) => fetchClientReviewList(user_id), "client");
};

export const getClientReviewDetailQuery = (
  id: number,
): Promise<ReviewDetailResponse> => {
  return withAuth(
    ({ user_id }) => fetchClientReviewDetail(id, user_id),
    "client",
  );
};
