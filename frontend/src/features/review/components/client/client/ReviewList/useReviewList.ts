"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateReviewMutation } from "@/features/review/hooks/client/useCreateReviewMutation";
import { useReviewListQuery } from "@/features/review/hooks/client/useReviewListQuery";
import type { ReviewLessonType } from "@/features/review/type";

type ReviewFormData = {
  forehand: number;
  backhand: number;
  serve: number;
  volley: number;
  return: number;
  serve_in: number;
  return_in: number;
  review_memo: string;
};

export function useReviewList() {
  const { data, isLoading } = useReviewListQuery();
  const createMutation = useCreateReviewMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<ReviewLessonType | null>(
    null,
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      forehand: 5,
      backhand: 5,
      serve: 5,
      volley: 5,
      return: 5,
      serve_in: 0,
      return_in: 0,
      review_memo: "",
    },
  });

  const openCreateModal = (lesson: ReviewLessonType) => {
    setSelectedLesson(lesson);
    reset({
      forehand: 5,
      backhand: 5,
      serve: 5,
      volley: 5,
      return: 5,
      serve_in: 50,
      return_in: 50,
      review_memo: "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    reset();
    setIsModalOpen(false);
    setSelectedLesson(null);
  };

  const onSubmit = async (formData: ReviewFormData) => {
    if (!selectedLesson) return;

    try {
      await createMutation.mutateAsync({
        lesson_id: selectedLesson.id,
        forehand: formData.forehand,
        backhand: formData.backhand,
        serve: formData.serve,
        volley: formData.volley,
        return: formData.return,
        serve_in: formData.serve_in,
        return_in: formData.return_in,
        review_memo: formData.review_memo || null,
      });
      closeModal();
    } catch (error) {
      console.error("振り返り作成エラー:", error);
    }
  };

  return {
    reviewLessons: data?.data ?? [],
    isLoading,
    isModalOpen,
    selectedLesson,
    openCreateModal,
    closeModal,
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
  };
}
