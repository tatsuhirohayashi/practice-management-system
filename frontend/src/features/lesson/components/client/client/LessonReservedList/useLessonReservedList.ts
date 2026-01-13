"use client";

import { useState } from "react";
import type { ReservedLessonType } from "@/features/lesson/type";
import { useCancelReservedLessonMutation } from "@/features/lesson/hooks/client/useCancelReservedLessonMutation";
import { useLessonReservedListQuery } from "@/features/lesson/hooks/client/useLessonReservedListQuery";
import { useConfirmReservedLessonMutation } from "@/features/lesson/hooks/client/useConfirmReservedLessonMutation";
import { useUncancelReservedLessonMutation } from "@/features/lesson/hooks/client/useUncancelReservedLessonMutation";
import { useUnconfirmReservedLessonMutation } from "@/features/lesson/hooks/client/useUnconfirmReservedLessonMutation";

export function useLessonReservedList() {
  const { data, isLoading } = useLessonReservedListQuery();
  const confirmMutation = useConfirmReservedLessonMutation();
  const unconfirmMutation = useUnconfirmReservedLessonMutation();
  const cancelMutation = useCancelReservedLessonMutation();
  const uncancelMutation = useUncancelReservedLessonMutation();
  const [selectedLesson, setSelectedLesson] = useState<ReservedLessonType | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"confirm" | "unconfirm" | "cancel" | "uncancel">("confirm");

  const handleOpenModal = (
    lesson: ReservedLessonType,
    type: "confirm" | "unconfirm" | "cancel" | "uncancel",
  ) => {
    setSelectedLesson(lesson);
    setModalType(type);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setSelectedLesson(null);
  };

  const handleConfirm = () => {
    if (selectedLesson) {
      confirmMutation.mutate(selectedLesson.id, {
        onSuccess: () => {
          handleCloseConfirmModal();
        },
      });
    }
  };

  const handleUnconfirm = () => {
    if (selectedLesson) {
      unconfirmMutation.mutate(selectedLesson.id, {
        onSuccess: () => {
          handleCloseConfirmModal();
        },
      });
    }
  };

  const handleCancel = () => {
    if (selectedLesson) {
      cancelMutation.mutate(selectedLesson.id, {
        onSuccess: () => {
          handleCloseConfirmModal();
        },
      });
    }
  };

  const handleUncancel = () => {
    if (selectedLesson) {
      uncancelMutation.mutate(selectedLesson.id, {
        onSuccess: () => {
          handleCloseConfirmModal();
        },
      });
    }
  };

  return {
    reservedLessons: data?.data ?? [],
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
  };
}

