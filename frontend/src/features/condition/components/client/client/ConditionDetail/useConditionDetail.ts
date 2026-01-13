"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useConditionDetailQuery } from "@/features/condition/hooks/client/useConditionDetailQuery";
import { useUpdateConditionMutation } from "@/features/condition/hooks/client/useUpdateConditionMutation";

type ConditionFormData = {
  musle_pain: number;
  motivation: number;
  feeling: number;
  tired: number;
  condition_memo: string;
};

export function useConditionDetail(conditionId: number) {
  const { data, isLoading } = useConditionDetailQuery(conditionId);
  const conditionDetail = data?.data;
  const updateMutation = useUpdateConditionMutation();
  const [isEditMode, setIsEditMode] = useState(false);

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

  // データが取得できたらフォームに値を設定
  useEffect(() => {
    if (conditionDetail && !isLoading) {
      reset({
        musle_pain: conditionDetail.musle_pain,
        motivation: conditionDetail.motivation,
        feeling: conditionDetail.feeling,
        tired: conditionDetail.tired,
        condition_memo: conditionDetail.condition_memo || "",
      });
    }
  }, [conditionDetail, isLoading, reset]);

  const onSubmit = async (formData: ConditionFormData) => {
    if (!conditionDetail) return;

    try {
      await updateMutation.mutateAsync({
        id: conditionDetail.id,
        request: {
          musle_pain: formData.musle_pain,
          motivation: formData.motivation,
          feeling: formData.feeling,
          tired: formData.tired,
          condition_memo: formData.condition_memo || null,
        },
      });
      setIsEditMode(false);
    } catch (error) {
      console.error("コンディション更新エラー:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  return {
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

