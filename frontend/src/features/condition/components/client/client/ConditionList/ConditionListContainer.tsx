"use client";

import { ConditionListPresenter } from "./ConditionListPresenter";
import { useConditionList } from "./useConditionList";

export function ConditionListContainer() {
  const {
    conditionLessons,
    isLoading,
    isModalOpen,
    selectedLesson,
    openCreateModal,
    handleCloseModal,
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
  } = useConditionList();

  return (
    <ConditionListPresenter
      conditionLessons={conditionLessons}
      isLoading={isLoading}
      isModalOpen={isModalOpen}
      selectedLesson={selectedLesson}
      openCreateModal={openCreateModal}
      handleCloseModal={handleCloseModal}
      register={register}
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
}

