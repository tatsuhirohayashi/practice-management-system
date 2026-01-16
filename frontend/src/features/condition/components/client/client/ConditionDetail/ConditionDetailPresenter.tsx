"use client";

import Link from "next/link";
import type { useForm } from "react-hook-form";
import {
  feelingOptions,
  motivationOptions,
  muslePainOptions,
  tiredOptions,
} from "@/features/condition/common/constants";
import type { ConditionDetailType } from "@/features/condition/type";
import { FormLabel } from "@/shared/components/custom";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { formatLessonDetailDateTime } from "@/shared/lib/date";
import { formatUserNameFromUser } from "@/shared/lib/user";
import { clientRoutes } from "@/shared/navigation";
import { ConditionRadioGroupField } from "../ConditionRadioGroupField/ConditionRadioGroupField";

interface ConditionDetailPresenterProps {
  conditionDetail: ConditionDetailType | undefined;
  isLoading: boolean;
  register: ReturnType<typeof useForm<ConditionFormData>>["register"];
  control: ReturnType<typeof useForm<ConditionFormData>>["control"];
  handleSubmit: ReturnType<typeof useForm<ConditionFormData>>["handleSubmit"];
  errors: ReturnType<typeof useForm<ConditionFormData>>["formState"]["errors"];
  onSubmit: (data: ConditionFormData) => void;
  isEditMode: boolean;
  handleEditClick: () => void;
}

type ConditionFormData = {
  musle_pain: number;
  motivation: number;
  feeling: number;
  tired: number;
  condition_memo: string;
};

export function ConditionDetailPresenter({
  conditionDetail,
  isLoading,
  register,
  control,
  handleSubmit,
  errors,
  onSubmit,
  isEditMode,
  handleEditClick,
}: ConditionDetailPresenterProps) {
  if (isLoading || !conditionDetail) {
    return <div>読み込み中...</div>;
  }

  const lessonDisplay = `${formatLessonDetailDateTime(conditionDetail.lesson.lesson_day)}　${formatUserNameFromUser(conditionDetail.user, { withHonorific: true })}　${conditionDetail.lesson.lesson_location}`;

  return (
    <div className="px-12 py-2">
      <Link
        href={clientRoutes.condition.list}
        className="text-blue-500 mb-4 inline-block text-lg"
      >
        ↩︎戻る
      </Link>
      <h1 className="text-3xl font-bold mb-2">○コンディション詳細</h1>
      <p className="text-sm mb-4">
        以下のレッスンのコンディションを確認できます。
      </p>

      <hr className="mb-4" />

      {/* レッスン詳細 */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="border-2 border-black px-4 py-2 text-base text-left flex-1">
          {lessonDisplay}
        </div>
        <Button className="bg-blue-500 text-white" onClick={handleEditClick}>
          編集
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 筋肉痛 */}
        <ConditionRadioGroupField
          name="musle_pain"
          label="○筋肉痛"
          options={muslePainOptions}
          control={control}
          errors={errors}
          disabled={!isEditMode}
        />

        {/* モチベーション */}
        <ConditionRadioGroupField
          name="motivation"
          label="○モチベーション"
          options={motivationOptions}
          control={control}
          errors={errors}
          disabled={!isEditMode}
        />

        {/* 気分 */}
        <ConditionRadioGroupField
          name="feeling"
          label="○気分"
          options={feelingOptions}
          control={control}
          errors={errors}
          disabled={!isEditMode}
        />

        {/* 疲れ */}
        <ConditionRadioGroupField
          name="tired"
          label="○疲れ"
          options={tiredOptions}
          control={control}
          errors={errors}
          disabled={!isEditMode}
        />

        {/* 備考 */}
        <div className="space-y-2">
          <FormLabel>○備考</FormLabel>
          <Textarea
            className="w-full"
            rows={4}
            placeholder="備考を入力"
            {...register("condition_memo")}
            disabled={!isEditMode}
          />
        </div>

        {/* 更新ボタン */}
        {isEditMode && (
          <div className="flex justify-center">
            <Button type="submit" className="bg-blue-500 text-white px-8">
              更新
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
