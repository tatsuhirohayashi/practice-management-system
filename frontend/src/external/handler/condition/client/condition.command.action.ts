"use server";

import {
  createConditionCommand,
  updateConditionCommand,
} from "@/external/service/condition/client/condition.service";
import { withAuth } from "@/features/auth/servers/auth.guard";
import type {
  CreateConditionRequest,
  UpdateConditionRequest,
} from "@/features/condition/type";

export async function createConditionCommandAction(
  request: CreateConditionRequest,
) {
  return withAuth(
    ({ user_id }) => createConditionCommand(request, user_id),
    "client",
  );
}

export async function updateConditionCommandAction(
  id: number,
  request: UpdateConditionRequest,
) {
  return withAuth(
    ({ user_id }) => updateConditionCommand(id, request, user_id),
    "client",
  );
}
