"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLessonNotReservedListQuery } from "@/features/lesson/hooks/coach/useLessonNotReservedListQuery";
import { useLessonReservedListQuery } from "@/features/lesson/hooks/coach/useLessonReservedListQuery";
import { useNotReserveMutation } from "@/features/lesson/hooks/coach/useNotReserveMutation";
import { useReserveLessonMutation } from "@/features/lesson/hooks/coach/useReserveLessonMutation";
import type { NotReservedLessonType } from "@/features/lesson/type";
import { type ReserveFormData, reserveFormSchema } from "./schema";

export function useLessonNotReservedList() {
  const { data, isLoading } = useLessonNotReservedListQuery();
  const { data: reservedLessonsData } = useLessonReservedListQuery();
  const reserveMutation = useReserveLessonMutation();
  const notReserveMutation = useNotReserveMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] =
    useState<NotReservedLessonType | null>(null);
  const [selectedLessonForNotReserve, setSelectedLessonForNotReserve] =
    useState<NotReservedLessonType | null>(null);
  const [isNotReserveModalOpen, setIsNotReserveModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ReserveFormData>({
    resolver: zodResolver(reserveFormSchema),
    defaultValues: {
      lesson_location: "",
    },
  });

  const openReserveModal = (lesson: NotReservedLessonType) => {
    setSelectedLesson(lesson);
    reset({
      lesson_location: lesson.lesson_location || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
    reset();
  };

  const onSubmit = async (formData: ReserveFormData) => {
    if (!selectedLesson) return;

    // 予約済みレッスンとの重複チェック（クライアントに関係なく、同じ日時のレッスンは重複不可）
    const reservedLessons = reservedLessonsData?.data ?? [];
    const isDuplicate = reservedLessons.some((reservedLesson) => {
      // 同じ日時かどうかをチェック（ISO datetime stringを比較）
      const selectedLessonDate = new Date(selectedLesson.lesson_day);
      const reservedLessonDate = new Date(reservedLesson.lesson_day);
      
      // 日付と時間（分まで）が同じかチェック
      return (
        selectedLessonDate.getFullYear() === reservedLessonDate.getFullYear() &&
        selectedLessonDate.getMonth() === reservedLessonDate.getMonth() &&
        selectedLessonDate.getDate() === reservedLessonDate.getDate() &&
        selectedLessonDate.getHours() === reservedLessonDate.getHours() &&
        selectedLessonDate.getMinutes() === reservedLessonDate.getMinutes()
      );
    });

    if (isDuplicate) {
      setError("root", {
        type: "manual",
        message: "同じ日時のレッスンが既に予約済みです。",
      });
      return;
    }

    try {
      await reserveMutation.mutateAsync({
        id: selectedLesson.id,
        request: {
          lesson_location: formData.lesson_location,
        },
      });
      closeModal();
    } catch (error) {
      console.error("レッスン予約エラー:", error);
    }
  };

  const handleCloseModal = () => {
    reset();
    closeModal();
  };

  const handleOpenNotReserveModal = (lesson: NotReservedLessonType) => {
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

  return {
    reservedNotLessons: data?.data ?? [],
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
  };
}

