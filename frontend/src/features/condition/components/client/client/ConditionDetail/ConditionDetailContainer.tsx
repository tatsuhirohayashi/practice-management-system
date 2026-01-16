"use client";

import { ConditionDetailPresenter } from "./ConditionDetailPresenter";
import { useConditionDetail } from "./useConditionDetail";

interface ConditionDetailContainerProps {
  conditionId: number;
}

export function ConditionDetailContainer({
  conditionId,
}: ConditionDetailContainerProps) {
  const {
    conditionDetail,
    isLoading,
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    isEditMode,
    handleEditClick,
  } = useConditionDetail(conditionId);

  return (
    <ConditionDetailPresenter
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
