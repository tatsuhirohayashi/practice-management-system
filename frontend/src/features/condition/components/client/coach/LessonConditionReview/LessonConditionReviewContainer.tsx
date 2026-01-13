"use client";

import { LessonConditionReviewPresenter } from "./LessonConditionReviewPresenter";
import { useLessonConditionReview } from "./useLessonConditionReview";

interface LessonConditionReviewContainerProps {
  lessonId: number;
}

export function LessonConditionReviewContainer({
  lessonId,
}: LessonConditionReviewContainerProps) {
  const { lessonData, isLoading } = useLessonConditionReview(lessonId);

  return (
    <LessonConditionReviewPresenter
      lessonData={lessonData}
      isLoading={isLoading}
    />
  );
}

