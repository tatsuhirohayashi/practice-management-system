"use server";

import {
  coachLoginCommand,
  coachRegisterCommand,
  loginCommand,
} from "@/external/service/auth/auth.service";
import type { LoginRequest, RegisterRequest } from "@/features/auth/types";

export async function loginCommandAction(request: LoginRequest) {
  return loginCommand(request);
}

export async function coachLoginCommandAction(request: LoginRequest) {
  return coachLoginCommand(request);
}

export async function coachRegisterCommandAction(request: RegisterRequest) {
  return coachRegisterCommand(request);
}
