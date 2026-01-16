"use client";

import { LessonNotReservedListPresenter } from "./LessonNotReservedListPresenter";
import { useLessonNotReservedList } from "./useLessonNotReservedList";

export function LessonNotReservedListContainer() {
  const {
    reservedNotLessons,
    isLoading,
    isModalOpen,
    isEditMode,
    openModal,
    closeModal,
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    selectedLessonForDelete,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    draftLessons,
    removeDraftLesson,
    handleCreateAllDraftLessons,
  } = useLessonNotReservedList();

  return (
    <LessonNotReservedListPresenter
      reservedNotLessons={reservedNotLessons}
      isLoading={isLoading}
      isModalOpen={isModalOpen}
      isEditMode={isEditMode}
      onOpenModal={openModal}
      register={register}
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
      handleCloseModal={closeModal}
      selectedLessonForDelete={selectedLessonForDelete}
      isDeleteModalOpen={isDeleteModalOpen}
      onOpenDeleteModal={handleOpenDeleteModal}
      onCloseDeleteModal={handleCloseDeleteModal}
      onDelete={handleDelete}
      draftLessons={draftLessons}
      onRemoveDraftLesson={removeDraftLesson}
      onCreateAllDraftLessons={handleCreateAllDraftLessons}
    />
  );
}
