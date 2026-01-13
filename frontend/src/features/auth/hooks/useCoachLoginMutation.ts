import { useMutation } from "@tanstack/react-query";
import { coachLoginCommandAction } from "@/external/handler/auth/auth.query.action";
import type { LoginRequest } from "../types";

export function useCoachLoginMutation() {
  return useMutation({
    mutationFn: (request: LoginRequest) => coachLoginCommandAction(request),
  });
}
