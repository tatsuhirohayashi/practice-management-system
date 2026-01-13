import { useMutation } from "@tanstack/react-query";
import { coachRegisterCommandAction } from "@/external/handler/auth/auth.query.action";
import type { RegisterRequest } from "../types";

export function useCoachRegisterMutation() {
  return useMutation({
    mutationFn: (request: RegisterRequest) =>
      coachRegisterCommandAction(request),
  });
}
