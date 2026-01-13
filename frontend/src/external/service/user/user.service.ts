import type {
  ClientListType,
  CreateClientRequest,
  CreateClientResponse,
} from "@/features/user/type";
import { getAxiosInstance } from "@/shared/api/axios-instance";

export async function fetchCoachClientList(
  user_id: string,
): Promise<ClientListType> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.get<ClientListType>("/coaches/clients", {
    params: { user_id },
  });
  return response.data;
}

export async function createCoachClientCommand(
  request: CreateClientRequest,
  user_id: string,
): Promise<CreateClientResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post<CreateClientResponse>(
    "/coaches/clients",
    { ...request, user_id },
  );
  return response.data;
}
