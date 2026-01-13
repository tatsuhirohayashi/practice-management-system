import type {
  ConditionDetailResponse,
  ConditionLessonListType,
  CreateConditionRequest,
  CreateConditionResponse,
  UpdateConditionRequest,
  UpdateConditionResponse,
} from "@/features/condition/type";
import { getAxiosInstance } from "@/shared/api/axios-instance";

export async function fetchClientConditionList(
  user_id: string,
): Promise<ConditionLessonListType> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.get<ConditionLessonListType>(
    "/clients/condition-list",
    {
      params: { user_id },
    },
  );
  return response.data;
}

export async function fetchClientConditionDetail(
  id: number,
  user_id: string,
): Promise<ConditionDetailResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.get<ConditionDetailResponse>(
    `/clients/condition/${id}`,
    {
      params: { user_id },
    },
  );
  return response.data;
}

export async function createConditionCommand(
  request: CreateConditionRequest,
  user_id: string,
): Promise<CreateConditionResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post<CreateConditionResponse>(
    "/clients/condition",
    { ...request, user_id },
  );
  return response.data;
}

export async function updateConditionCommand(
  id: number,
  request: UpdateConditionRequest,
  user_id: string,
): Promise<UpdateConditionResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.put<UpdateConditionResponse>(
    `/clients/condition/${id}`,
    { ...request, user_id },
  );
  return response.data;
}
