"use client";

import Link from "next/link";
import type { useForm } from "react-hook-form";
import type { ConditionDetailType } from "@/features/condition/type";
import { skillOptions } from "@/features/review/common/constants";
import type { ReviewDetailType } from "@/features/review/type";
import { FormLabel } from "@/shared/components/custom";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { formatLessonDetailDateTime } from "@/shared/lib/date";
import { formatUserNameFromUser } from "@/shared/lib/user";
import { clientRoutes } from "@/shared/navigation";
import { ConditionRatingItem } from "../../ConditionRatingItem/ConditionRatingItem";
import { ReviewRadioGroupField } from "../ReviewRadioGroupField/ReviewRadioGroupField";
import { ReviewSliderField } from "../ReviewSliderField/ReviewSliderField";

interface ReviewDetailPresenterProps {
  reviewDetail: ReviewDetailType | undefined;
  conditionDetail: ConditionDetailType | undefined;
  isLoading: boolean;
  register: ReturnType<typeof useForm<ReviewFormData>>["register"];
  control: ReturnType<typeof useForm<ReviewFormData>>["control"];
  handleSubmit: ReturnType<typeof useForm<ReviewFormData>>["handleSubmit"];
  errors: ReturnType<typeof useForm<ReviewFormData>>["formState"]["errors"];
  onSubmit: (data: ReviewFormData) => void;
  isEditMode: boolean;
  handleEditClick: () => void;
}

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

export function ReviewDetailPresenter({
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
}: ReviewDetailPresenterProps) {
  if (isLoading || !reviewDetail) {
    return <div>読み込み中...</div>;
  }

  const lessonDisplay = `${formatLessonDetailDateTime(reviewDetail.lesson.lesson_day)}  ${formatUserNameFromUser(reviewDetail.user, { withHonorific: true })}  ${reviewDetail.lesson.lesson_location}`;

  return (
    <div className="px-12 py-2">
      <Link
        href={clientRoutes.review.list}
        className="text-blue-500 mb-4 inline-block text-lg"
      >
        ↩︎戻る
      </Link>
      <h1 className="text-3xl font-bold mb-2">○振り返り詳細</h1>
      <p className="text-sm mb-4">以下のレッスンの振り返りを確認できます。</p>

      <hr className="mb-4" />

      {/* レッスン詳細と編集ボタン */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex-1" />
        <Button className="bg-blue-500 text-white" onClick={handleEditClick}>
          編集
        </Button>
      </div>

      {/* 黒い枠で囲まれたセクション */}
      <div className="border-2 border-black px-4 py-4 mb-6 space-y-4">
        {/* レッスン詳細 */}
        <div className="text-base text-left">{lessonDisplay}</div>

        {/* 自己評価セクション */}
        {conditionDetail && (
          <>
            <div className="space-y-3">
              <ConditionRatingItem
                label="○筋肉痛"
                rating={conditionDetail.musle_pain}
              />
              <ConditionRatingItem
                label="○モチベーション"
                rating={conditionDetail.motivation}
              />
              <ConditionRatingItem
                label="○気分"
                rating={conditionDetail.feeling}
              />
              <ConditionRatingItem
                label="○疲れ"
                rating={conditionDetail.tired}
              />
            </div>

            {/* 備考 */}
            <div className="space-y-2">
              <span className="text-base">○備考</span>
              <p className="text-base">
                {conditionDetail.condition_memo || ""}
              </p>
            </div>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* フォアハンド */}
        <ReviewRadioGroupField
          name="forehand"
          label="○フォアハンド"
          options={skillOptions}
          control={control}
          errors={errors}
          disabled={!isEditMode}
        />

        {/* バックハンド */}
        <ReviewRadioGroupField
          name="backhand"
          label="○バックハンド"
          options={skillOptions}
          control={control}
          errors={errors}
          disabled={!isEditMode}
        />

        {/* サーブ */}
        <ReviewRadioGroupField
          name="serve"
          label="○サーブ"
          options={skillOptions}
          control={control}
          errors={errors}
          disabled={!isEditMode}
        />

        {/* ボレー */}
        <ReviewRadioGroupField
          name="volley"
          label="○ボレー"
          options={skillOptions}
          control={control}
          errors={errors}
          disabled={!isEditMode}
        />

        {/* リターン */}
        <ReviewRadioGroupField
          name="return"
          label="○リターン"
          options={skillOptions}
          control={control}
          errors={errors}
          disabled={!isEditMode}
        />

        {/* サーブイン */}
        <ReviewSliderField
          name="serve_in"
          label="○サーブイン"
          control={control}
          errors={errors}
          disabled={!isEditMode}
          sliderClassName="w-[60%]"
          inputClassName="w-[40%]"
        />

        {/* リターンイン */}
        <ReviewSliderField
          name="return_in"
          label="○リターンイン"
          control={control}
          errors={errors}
          disabled={!isEditMode}
          sliderClassName="w-[60%]"
          inputClassName="w-[40%]"
        />

        {/* その他メモ */}
        <div className="space-y-2">
          <FormLabel>○その他メモ</FormLabel>
          <Textarea
            className="w-full bg-white"
            rows={4}
            placeholder="その他メモを入力"
            {...register("review_memo")}
            disabled={!isEditMode}
          />
        </div>

        {/* 完了ボタン */}
        {isEditMode && (
          <div className="flex justify-center">
            <Button type="submit" className="bg-blue-500 text-white px-8">
              完了
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
