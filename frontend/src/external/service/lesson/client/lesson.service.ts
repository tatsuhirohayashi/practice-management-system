import type {
  CreateNotReservedLessonRequest,
  CreateNotReservedLessonResponse,
  CreateNotReservedLessonsRequest,
  CreateNotReservedLessonsResponse,
  NotReservedLessonListType,
  UpdateNotReservedLessonRequest,
  UpdateNotReservedLessonResponse,
} from "@/features/lesson/type";
import type {
  CancelReservedLessonResponse,
  ConfirmReservedLessonResponse,
  ReservedLessonListType,
  UncancelReservedLessonResponse,
  UnconfirmReservedLessonResponse,
} from "@/features/lesson/type";
import { getAxiosInstance } from "@/shared/api/axios-instance";

// Reserved Lesson
export async function fetchReservedLesson(
  user_id: string,
): Promise<ReservedLessonListType> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.get<ReservedLessonListType>(
    `/clients/reserved-lessons`,
    {
      params: { user_id },
    },
  );
  return response.data;
}

export async function confirmReservedLessonCommand(
  id: number,
  user_id: string,
): Promise<ConfirmReservedLessonResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.put<ConfirmReservedLessonResponse>(
    `/clients/reserved-lessons/${id}/confirmed`,
    { user_id },
  );
  return response.data;
}

export async function unconfirmReservedLessonCommand(
  id: number,
  user_id: string,
): Promise<UnconfirmReservedLessonResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.put<UnconfirmReservedLessonResponse>(
    `/clients/reserved-lessons/${id}/not-confirmed`,
    { user_id },
  );
  return response.data;
}

export async function cancelReservedLessonCommand(
  id: number,
  user_id: string,
): Promise<CancelReservedLessonResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.put<CancelReservedLessonResponse>(
    `/clients/reserved-lessons/${id}/cancel`,
    { user_id },
  );
  return response.data;
}

export async function uncancelReservedLessonCommand(
  id: number,
  user_id: string,
): Promise<UncancelReservedLessonResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.put<UncancelReservedLessonResponse>(
    `/clients/reserved-lessons/${id}/not-cancel`,
    { user_id },
  );
  return response.data;
}

// Not Reserved Lesson
export async function fetchNotReservedLesson(
  user_id: string,
): Promise<NotReservedLessonListType> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.get<NotReservedLessonListType>(
    "/clients/not-reserved-lessons",
    {
      params: { user_id },
    },
  );
  return response.data;
}

export async function createNotReservedLessonCommand(
  request: CreateNotReservedLessonRequest,
  user_id: string,
): Promise<CreateNotReservedLessonResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post<CreateNotReservedLessonResponse>(
    "/clients/not-reserved-lessons",
    { ...request, user_id },
  );
  return response.data;
}

export async function createNotReservedLessonsCommand(
  request: CreateNotReservedLessonsRequest,
  user_id: string,
): Promise<CreateNotReservedLessonsResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post<CreateNotReservedLessonsResponse>(
    "/clients/not-reserved-lessons",
    { ...request, user_id },
  );
  return response.data;
}

export async function updateNotReservedLessonCommand(
  id: number,
  request: UpdateNotReservedLessonRequest,
  user_id: string,
): Promise<UpdateNotReservedLessonResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.put<UpdateNotReservedLessonResponse>(
    `/clients/not-reserved-lessons/${id}`,
    { ...request, user_id },
  );
  return response.data;
}

export async function deleteNotReservedLessonCommand(
  id: number,
  user_id: string,
): Promise<void> {
  const axiosInstance = getAxiosInstance();
  await axiosInstance.delete(`/clients/not-reserved-lessons/${id}`, {
    data: { user_id },
  });
}
