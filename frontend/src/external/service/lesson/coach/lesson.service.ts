import type {
  CancelReservedLessonResponse,
  NotReservationResponse,
  NotReservedLessonListType,
  ReservedLessonListType,
  ReserveLessonRequest,
  ReserveLessonResponse,
} from "@/features/lesson/type";
import { getAxiosInstance } from "@/shared/api/axios-instance";

// Coach Reserved Lesson
export async function fetchCoachReservedLesson(
  user_id: string,
): Promise<ReservedLessonListType> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.get<ReservedLessonListType>(
    "/coaches/reserved-lessons",
    {
      params: { user_id },
    },
  );
  return response.data;
}

export async function cancelCoachReservedLessonCommand(
  id: number,
  user_id: string,
): Promise<CancelReservedLessonResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.put<CancelReservedLessonResponse>(
    `/coaches/reserved-lessons/${id}/cancel`,
    { user_id },
  );
  return response.data;
}

// Coach Not Reserved Lesson
export async function fetchCoachNotReservedLesson(
  user_id: string,
): Promise<NotReservedLessonListType> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.get<NotReservedLessonListType>(
    "/coaches/not-reserved-lessons",
    {
      params: { user_id },
    },
  );
  return response.data;
}

export async function reserveLessonCommand(
  id: number,
  request: ReserveLessonRequest,
  user_id: string,
): Promise<ReserveLessonResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.put<ReserveLessonResponse>(
    `/coaches/not-reserved-lessons/${id}/reserve`,
    { ...request, user_id },
  );
  return response.data;
}

export async function notReserveCommand(
  id: number,
  user_id: string,
): Promise<NotReservationResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.put<NotReservationResponse>(
    `/coaches/reserved-lessons/${id}/not-reserved`,
    { user_id },
  );
  return response.data;
}
