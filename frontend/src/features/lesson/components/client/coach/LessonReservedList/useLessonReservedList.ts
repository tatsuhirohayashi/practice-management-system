"use client";

import { useState } from "react";
import type { ReservedLessonType } from "@/features/lesson/type";
import { useCancelCoachReservedLessonMutation } from "@/features/lesson/hooks/coach/useCancelCoachReservedLessonMutation";
import { useLessonReservedListQuery } from "@/features/lesson/hooks/coach/useLessonReservedListQuery";
import { useNotReserveReservedLessonMutation } from "@/features/lesson/hooks/coach/useNotReserveReservedLessonMutation";

export function useLessonReservedList() {
  const { data, isLoading } = useLessonReservedListQuery();
  const notReserveMutation = useNotReserveReservedLessonMutation();
  const cancelMutation = useCancelCoachReservedLessonMutation();
  const [selectedLessonForNotReserve, setSelectedLessonForNotReserve] =
    useState<ReservedLessonType | null>(null);
  const [isNotReserveModalOpen, setIsNotReserveModalOpen] = useState(false);
  const [selectedLessonForCancel, setSelectedLessonForCancel] =
    useState<ReservedLessonType | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleOpenNotReserveModal = (lesson: ReservedLessonType) => {
    setSelectedLessonForNotReserve(lesson);
    setIsNotReserveModalOpen(true);
  };

  const handleCloseNotReserveModal = () => {
    setIsNotReserveModalOpen(false);
    setSelectedLessonForNotReserve(null);
  };

  const handleNotReserve = () => {
    if (selectedLessonForNotReserve) {
      notReserveMutation.mutate(selectedLessonForNotReserve.id, {
        onSuccess: () => {
          handleCloseNotReserveModal();
        },
      });
    }
  };

  const handleOpenCancelModal = (lesson: ReservedLessonType) => {
    setSelectedLessonForCancel(lesson);
    setIsCancelModalOpen(true);
  };

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedLessonForCancel(null);
  };

  const handleCancel = () => {
    if (selectedLessonForCancel) {
      cancelMutation.mutate(selectedLessonForCancel.id, {
        onSuccess: () => {
          handleCloseCancelModal();
        },
      });
    }
  };

  return {
    reservedLessons: data?.data ?? [],
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
  };
}

