"use server";

import {
  createCoachClientCommand,
  fetchCoachClientList,
} from "@/external/service/user/user.service";
import { withAuth } from "@/features/auth/servers/auth.guard";
import type { CreateClientRequest } from "@/features/user/type";

export async function listCoachClientQueryAction() {
  return withAuth(({ user_id }) => fetchCoachClientList(user_id), "coach");
}

export async function createCoachClientCommandAction(
  request: CreateClientRequest,
) {
  return withAuth(
    ({ user_id }) => createCoachClientCommand(request, user_id),
    "coach",
  );
}
