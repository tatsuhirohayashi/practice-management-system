"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useConditionDetailQuery } from "@/features/condition/hooks/client/useConditionDetailQuery";
import { useConditionListQuery } from "@/features/condition/hooks/client/useConditionListQuery";
import { useReviewDetailQuery } from "@/features/review/hooks/client/useReviewDetailQuery";
import { useUpdateReviewMutation } from "@/features/review/hooks/client/useUpdateReviewMutation";

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

export function useReviewDetail(reviewId: number) {
  const { data, isLoading } = useReviewDetailQuery(reviewId);
  const reviewDetail = data?.data;
  const { data: conditionListData } = useConditionListQuery();
  const [isEditMode, setIsEditMode] = useState(false);

  // 該当するレッスンのコンディション情報を取得
  const conditionLesson = useMemo(() => {
    if (!reviewDetail || !conditionListData?.data) return null;
    return conditionListData.data.find(
      (condition) =>
        condition.id === reviewDetail.lesson.id &&
        condition.has_condition &&
        condition.condition_id,
    );
  }, [reviewDetail, conditionListData]);

  // コンディション詳細を取得
  const { data: conditionDetailData } = useConditionDetailQuery(
    conditionLesson?.condition_id ?? 0,
  );
  const conditionDetail = conditionDetailData?.data;

  const updateMutation = useUpdateReviewMutation();

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

  // データが取得できたらフォームに値を設定
  useEffect(() => {
    if (reviewDetail && !isLoading) {
      reset({
        forehand: reviewDetail.forehand,
        backhand: reviewDetail.backhand,
        serve: reviewDetail.serve,
        volley: reviewDetail.volley,
        return: reviewDetail.return,
        serve_in: reviewDetail.serve_in,
        return_in: reviewDetail.return_in,
        review_memo: reviewDetail.review_memo || "",
      });
    }
  }, [reviewDetail, isLoading, reset]);

  const onSubmit = async (formData: ReviewFormData) => {
    if (!reviewDetail) return;

    try {
      await updateMutation.mutateAsync({
        id: reviewDetail.id,
        request: {
          forehand: formData.forehand,
          backhand: formData.backhand,
          serve: formData.serve,
          volley: formData.volley,
          return: formData.return,
          serve_in: formData.serve_in,
          return_in: formData.return_in,
          review_memo: formData.review_memo || null,
        },
      });
      setIsEditMode(false);
    } catch (error) {
      console.error("振り返り更新エラー:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  return {
    reviewDetail,
    conditionDetail,
    isLoading,
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    isEditMode,
    handleEditClick,
  };
}
