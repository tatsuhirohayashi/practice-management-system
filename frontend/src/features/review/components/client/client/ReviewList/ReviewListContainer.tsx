"use client";

import { ReviewListPresenter } from "./ReviewListPresenter";
import { useReviewList } from "./useReviewList";

export function ReviewListContainer() {
  const {
    reviewLessons,
    isLoading,
    isModalOpen,
    selectedLesson,
    openCreateModal,
    closeModal,
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
  } = useReviewList();

  return (
    <ReviewListPresenter
      reviewLessons={reviewLessons}
      isLoading={isLoading}
      isModalOpen={isModalOpen}
      selectedLesson={selectedLesson}
      openCreateModal={openCreateModal}
      handleCloseModal={closeModal}
      register={register}
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
}

