import "server-only";

import {
  fetchClientConditionDetail,
  fetchClientConditionList,
} from "@/external/service/condition/client/condition.service";
import { withAuth } from "@/features/auth/servers/auth.guard";
import type {
  ConditionDetailResponse,
  ConditionLessonListType,
} from "@/features/condition/type";

export const listClientConditionQuery =
  (): Promise<ConditionLessonListType> => {
    return withAuth(
      ({ user_id }) => fetchClientConditionList(user_id),
      "client",
    );
  };

export const getClientConditionDetailQuery = (
  id: number,
): Promise<ConditionDetailResponse> => {
  return withAuth(
    ({ user_id }) => fetchClientConditionDetail(id, user_id),
    "client",
  );
};
