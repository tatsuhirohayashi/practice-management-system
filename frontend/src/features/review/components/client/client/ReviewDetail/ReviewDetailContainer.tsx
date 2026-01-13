"use client";

import { ReviewDetailPresenter } from "./ReviewDetailPresenter";
import { useReviewDetail } from "./useReviewDetail";

interface ReviewDetailContainerProps {
  reviewId: number;
}

export function ReviewDetailContainer({
  reviewId,
}: ReviewDetailContainerProps) {
  const {
    reviewDetail,
    conditionDetail,
    isLoading,
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    isEditMode,
    handleEditClick,
  } = useReviewDetail(reviewId);

  return (
    <ReviewDetailPresenter
      reviewDetail={reviewDetail}
      conditionDetail={conditionDetail}
      isLoading={isLoading}
      register={register}
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
      isEditMode={isEditMode}
      handleEditClick={handleEditClick}
    />
  );
}

