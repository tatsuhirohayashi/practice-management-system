"use client";

import { LessonReservedListPresenter } from "./LessonReservedListPresenter";
import { useLessonReservedList } from "./useLessonReservedList";

export function LessonReservedListContainer() {
  const {
    reservedLessons,
    isLoading,
    selectedLesson,
    isConfirmModalOpen,
    modalType,
    handleOpenModal,
    handleCloseConfirmModal,
    handleConfirm,
    handleUnconfirm,
    handleCancel,
    handleUncancel,
  } = useLessonReservedList();

  return (
    <LessonReservedListPresenter
      reservedLessons={reservedLessons}
      isLoading={isLoading}
      selectedLesson={selectedLesson}
      isConfirmModalOpen={isConfirmModalOpen}
      modalType={modalType}
      onOpenModal={handleOpenModal}
      onCloseConfirmModal={handleCloseConfirmModal}
      onConfirm={handleConfirm}
      onUnconfirm={handleUnconfirm}
      onCancel={handleCancel}
      onUncancel={handleUncancel}
    />
  );
}

