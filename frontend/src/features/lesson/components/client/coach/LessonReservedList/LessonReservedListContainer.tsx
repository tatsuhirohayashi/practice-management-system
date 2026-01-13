"use client";

import { LessonReservedListPresenter } from "./LessonReservedListPresenter";
import { useLessonReservedList } from "./useLessonReservedList";

export function LessonReservedListContainer() {
  const {
    reservedLessons,
    isLoading,
    selectedLessonForNotReserve,
    isNotReserveModalOpen,
    handleOpenNotReserveModal,
    handleCloseNotReserveModal,
    handleNotReserve,
    selectedLessonForCancel,
    isCancelModalOpen,
    handleOpenCancelModal,
    handleCloseCancelModal,
    handleCancel,
  } = useLessonReservedList();

  return (
    <LessonReservedListPresenter
      reservedLessons={reservedLessons}
      isLoading={isLoading}
      selectedLessonForNotReserve={selectedLessonForNotReserve}
      isNotReserveModalOpen={isNotReserveModalOpen}
      onOpenNotReserveModal={handleOpenNotReserveModal}
      onCloseNotReserveModal={handleCloseNotReserveModal}
      onNotReserve={handleNotReserve}
      selectedLessonForCancel={selectedLessonForCancel}
      isCancelModalOpen={isCancelModalOpen}
      onOpenCancelModal={handleOpenCancelModal}
      onCloseCancelModal={handleCloseCancelModal}
      onCancel={handleCancel}
    />
  );
}

