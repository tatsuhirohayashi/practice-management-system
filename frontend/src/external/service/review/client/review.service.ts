import type {
  CreateReviewRequest,
  CreateReviewResponse,
  ReviewDetailResponse,
  ReviewLessonListType,
  UpdateReviewRequest,
  UpdateReviewResponse,
} from "@/features/review/type";
import { getAxiosInstance } from "@/shared/api/axios-instance";

export async function fetchClientReviewList(
  user_id: string,
): Promise<ReviewLessonListType> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.get<ReviewLessonListType>(
    "/clients/review-list",
    {
      params: { user_id },
    },
  );
  return response.data;
}

export async function fetchClientReviewDetail(
  id: number,
  user_id: string,
): Promise<ReviewDetailResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.get<ReviewDetailResponse>(
    `/clients/review/${id}`,
    {
      params: { user_id },
    },
  );
  return response.data;
}

export async function createReviewCommand(
  request: CreateReviewRequest,
  user_id: string,
): Promise<CreateReviewResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.post<CreateReviewResponse>(
    "/clients/review",
    { ...request, user_id },
  );
  return response.data;
}

export async function updateReviewCommand(
  id: number,
  request: UpdateReviewRequest,
  user_id: string,
): Promise<UpdateReviewResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.put<UpdateReviewResponse>(
    `/clients/review/${id}`,
    { ...request, user_id },
  );
  return response.data;
}
