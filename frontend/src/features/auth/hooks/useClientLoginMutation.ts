import { useMutation } from "@tanstack/react-query";
import { loginCommandAction } from "@/external/handler/auth/auth.query.action";
import type { LoginRequest } from "../types";

export function useClientLoginMutation() {
  return useMutation({
    mutationFn: (request: LoginRequest) => loginCommandAction(request),
  });
}
