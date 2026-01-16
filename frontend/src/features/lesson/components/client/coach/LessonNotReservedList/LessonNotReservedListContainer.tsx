"use client";

import { LessonNotReservedListPresenter } from "./LessonNotReservedListPresenter";
import { useLessonNotReservedList } from "./useLessonNotReservedList";

export function LessonNotReservedListContainer() {
  const {
    reservedNotLessons,
    isLoading,
    isModalOpen,
    selectedLesson,
    openReserveModal,
    handleCloseModal,
    register,
    handleSubmit,
    errors,
    onSubmit,
    selectedLessonForNotReserve,
    isNotReserveModalOpen,
    handleOpenNotReserveModal,
    handleCloseNotReserveModal,
    handleNotReserve,
  } = useLessonNotReservedList();

  return (
    <LessonNotReservedListPresenter
      reservedNotLessons={reservedNotLessons}
      isLoading={isLoading}
      isModalOpen={isModalOpen}
      selectedLesson={selectedLesson}
      onOpenReserveModal={openReserveModal}
      onCloseModal={handleCloseModal}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
      selectedLessonForNotReserve={selectedLessonForNotReserve}
      isNotReserveModalOpen={isNotReserveModalOpen}
      onOpenNotReserveModal={handleOpenNotReserveModal}
      onCloseNotReserveModal={handleCloseNotReserveModal}
      onNotReserve={handleNotReserve}
    />
  );
}
