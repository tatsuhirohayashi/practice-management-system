"use server";

import {
  fetchClientConditionDetail,
  fetchClientConditionList,
} from "@/external/service/condition/client/condition.service";
import { withAuth } from "@/features/auth/servers/auth.guard";

export async function listClientConditionQueryAction() {
  return withAuth(({ user_id }) => fetchClientConditionList(user_id), "client");
}

export async function getClientConditionDetailQueryAction(id: number) {
  return withAuth(
    ({ user_id }) => fetchClientConditionDetail(id, user_id),
    "client",
  );
}
