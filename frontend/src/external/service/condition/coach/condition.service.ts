import type { LessonConditionReviewResponse } from "@/features/condition/type";
import { getAxiosInstance } from "@/shared/api/axios-instance";

export async function fetchCoachLessonConditionReview(
  id: number,
  user_id: string,
): Promise<LessonConditionReviewResponse> {
  const axiosInstance = getAxiosInstance();
  const response = await axiosInstance.get<LessonConditionReviewResponse>(
    `/coaches/lessons/${id}/condition-review`,
    {
      params: { user_id },
    },
  );
  return response.data;
}
