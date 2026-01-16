"use client";

import { useLessonConditionReviewQuery } from "@/features/condition/hooks/coach/useLessonConditionReviewQuery";

export function useLessonConditionReview(lessonId: number) {
  const { data, isLoading } = useLessonConditionReviewQuery(lessonId);
  const lessonData = data?.data;

  return {
    lessonData,
    isLoading,
  };
}
