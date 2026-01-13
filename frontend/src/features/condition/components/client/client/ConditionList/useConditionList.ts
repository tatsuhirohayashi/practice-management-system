"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useConditionListQuery } from "@/features/condition/hooks/client/useConditionListQuery";
import { useCreateConditionMutation } from "@/features/condition/hooks/client/useCreateConditionMutation";
import type { ConditionLessonType } from "@/features/condition/type";

type ConditionFormData = {
  musle_pain: number;
  motivation: number;
  feeling: number;
  tired: number;
  condition_memo: string;
};

export function useConditionList() {
  const { data, isLoading } = useConditionListQuery();
  const createMutation = useCreateConditionMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] =
    useState<ConditionLessonType | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConditionFormData>({
    defaultValues: {
      musle_pain: 1,
      motivation: 1,
      feeling: 1,
      tired: 1,
      condition_memo: "",
    },
  });

  const openCreateModal = (lesson: ConditionLessonType) => {
    setSelectedLesson(lesson);
    reset({
      musle_pain: 1,
      motivation: 1,
      feeling: 1,
      tired: 1,
      condition_memo: "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
    reset();
  };

  const onSubmit = async (formData: ConditionFormData) => {
    if (!selectedLesson) return;

    try {
      await createMutation.mutateAsync({
        lesson_id: selectedLesson.id,
        musle_pain: formData.musle_pain,
        motivation: formData.motivation,
        feeling: formData.feeling,
        tired: formData.tired,
        condition_memo: formData.condition_memo || null,
      });
      closeModal();
    } catch (error) {
      console.error("コンディション作成エラー:", error);
    }
  };

  const handleCloseModal = () => {
    reset();
    closeModal();
  };

  return {
    conditionLessons: data?.data ?? [],
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
  };
}

