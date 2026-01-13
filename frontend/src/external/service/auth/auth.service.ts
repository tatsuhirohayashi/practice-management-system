import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/features/auth/types";
import { getAxiosInstance } from "@/shared/api/axios-instance";

export async function loginCommand(
  request: LoginRequest,
): Promise<LoginResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post<LoginResponse>(
    "/user/login",
    request,
  );
  return response.data;
}

export async function coachLoginCommand(
  request: LoginRequest,
): Promise<LoginResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post<LoginResponse>(
    "/user/login",
    request,
  );
  return response.data;
}

export async function coachRegisterCommand(
  request: RegisterRequest,
): Promise<RegisterResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post<RegisterResponse>(
    "/coaches/register",
    request,
  );
  return response.data;
}
