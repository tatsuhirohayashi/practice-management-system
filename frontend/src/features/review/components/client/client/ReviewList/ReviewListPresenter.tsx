"use client";

import type { Route } from "next";
import Link from "next/link";
import type { useForm } from "react-hook-form";
import {
  REVIEW_STATUS,
  skillOptions,
} from "@/features/review/common/constants";
import type { ReviewLessonType } from "@/features/review/type";
import { FormLabel } from "@/shared/components/custom";
import { BasicModal } from "@/shared/components/modal/BasicModal";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Textarea } from "@/shared/components/ui/textarea";
import { formatDate, formatLessonDetailDateTime } from "@/shared/lib/date";
import { formatUserNameFromUser } from "@/shared/lib/user";
import { clientRoutes } from "@/shared/navigation";
import { ReviewRadioGroupField } from "../ReviewRadioGroupField/ReviewRadioGroupField";
import { ReviewSliderField } from "../ReviewSliderField/ReviewSliderField";

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

interface ReviewListPresenterProps {
  reviewLessons: ReviewLessonType[];
  isLoading: boolean;
  isModalOpen: boolean;
  selectedLesson: ReviewLessonType | null;
  openCreateModal: (lesson: ReviewLessonType) => void;
  handleCloseModal: () => void;
  register: ReturnType<typeof useForm<ReviewFormData>>["register"];
  control: ReturnType<typeof useForm<ReviewFormData>>["control"];
  handleSubmit: ReturnType<typeof useForm<ReviewFormData>>["handleSubmit"];
  errors: ReturnType<typeof useForm<ReviewFormData>>["formState"]["errors"];
  onSubmit: (data: ReviewFormData) => void;
}

// ステータスに応じたバッジの色とテキストを取得
const getStatusBadge = (lesson: ReviewLessonType) => {
  if (lesson.has_review) {
    return REVIEW_STATUS.RECORDED;
  }
  return REVIEW_STATUS.NOT_RECORDED;
};

// アクションボタンを取得
const getActionButton = (
  lesson: ReviewLessonType,
  openCreateModal: (lesson: ReviewLessonType) => void,
) => {
  if (lesson.has_review && lesson.review_id) {
    return (
      <Link href={clientRoutes.review.detail(lesson.review_id) as Route}>
        <Button className="bg-blue-500 text-sm text-white">詳細</Button>
      </Link>
    );
  }

  // レッスンが終了している場合のみ「記載」ボタンを表示
  if (!lesson.is_finished) {
    return null;
  }

  return (
    <Button
      className="bg-blue-500 text-sm text-white"
      onClick={() => openCreateModal(lesson)}
    >
      記載
    </Button>
  );
};

export function ReviewListPresenter({
  reviewLessons,
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
}: ReviewListPresenterProps) {
  return (
    <>
      <div className="px-12 py-2">
        <h1 className="text-3xl font-bold mb-2 text-center">○振り返り一覧</h1>
        <p className="text-sm mb-4">
          レッスン後の振り返りを一覧で確認できます。
        </p>

        {/* レッスンリスト */}
        <div className="flex-1 space-y-4">
          {isLoading ? (
            // スケルトンローディング
            Array.from({ length: 6 }, () => (
              <Card
                key={`skeleton-${crypto.randomUUID()}`}
                className="rounded-lg border-2"
              >
                <CardContent className="flex items-center">
                  {/* ステータスパート */}
                  <div className="w-1/8 flex justify-center">
                    <Skeleton className="h-6 w-16" />
                  </div>
                  {/* 予約内容パート */}
                  <div className="flex-1 space-y-2">
                    <div className="flex space-x-6">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <div>
                      <Skeleton className="h-5 w-48" />
                    </div>
                  </div>
                  {/* アクションボタンパート */}
                  <div className="w-1/8 flex justify-center">
                    <Skeleton className="h-8 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : reviewLessons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              データがありません
            </div>
          ) : (
            reviewLessons.map((reviewLesson) => {
              const statusBadge = getStatusBadge(reviewLesson);
              const userName = formatUserNameFromUser(reviewLesson.user, {
                withHonorific: true,
              });

              return (
                <Card key={reviewLesson.id} className="rounded-lg border-2">
                  <CardContent className="flex items-center">
                    {/* ステータスパート */}
                    <div className="w-1/8 flex justify-center">
                      <Badge className={statusBadge.className}>
                        {statusBadge.text}
                      </Badge>
                    </div>
                    {/* 予約内容パート */}
                    <div className="flex-1 space-y-2">
                      <div className="flex space-x-6">
                        <div>{formatDate(reviewLesson.lesson_day)}</div>
                        <div>{userName}</div>
                        <div>{reviewLesson.lesson_location}</div>
                      </div>
                      <div>
                        <div>備考 {reviewLesson.lesson_memo || ""}</div>
                      </div>
                    </div>
                    {/* アクションボタンパート */}
                    <div className="w-1/8 flex justify-center">
                      {getActionButton(reviewLesson, openCreateModal)}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* 振り返り作成モーダル */}
      <BasicModal
        open={isModalOpen}
        title="○振り返りの記入"
        onBack={handleCloseModal}
        onConfirm={handleSubmit(onSubmit)}
        onClose={handleCloseModal}
        backButtonText="戻る"
        confirmButtonText="完了"
        confirmButtonClassName="bg-blue-500 text-white flex-1"
        showCloseButton={false}
        maxWidth="sm:max-w-2xl"
      >
        {selectedLesson && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <p className="text-sm mb-4">
              レッスン後の振り返りを記入してください。
            </p>

            {/* レッスン詳細 */}
            <div className="border-2 border-black px-4 py-2 text-base text-left">
              {`${formatLessonDetailDateTime(selectedLesson.lesson_day)}  ${formatUserNameFromUser(selectedLesson.user, { withHonorific: true })}  ${selectedLesson.lesson_location}`}
            </div>

            {/* フォアハンド */}
            <ReviewRadioGroupField
              name="forehand"
              label="○フォアハンド"
              options={skillOptions}
              control={control}
              errors={errors}
              idPrefix="modal"
            />

            {/* バックハンド */}
            <ReviewRadioGroupField
              name="backhand"
              label="○バックハンド"
              options={skillOptions}
              control={control}
              errors={errors}
              idPrefix="modal"
            />

            {/* サーブ */}
            <ReviewRadioGroupField
              name="serve"
              label="○サーブ"
              options={skillOptions}
              control={control}
              errors={errors}
              idPrefix="modal"
            />

            {/* ボレー */}
            <ReviewRadioGroupField
              name="volley"
              label="○ボレー"
              options={skillOptions}
              control={control}
              errors={errors}
              idPrefix="modal"
            />

            {/* リターン */}
            <ReviewRadioGroupField
              name="return"
              label="○リターン"
              options={skillOptions}
              control={control}
              errors={errors}
              idPrefix="modal"
            />

            {/* サーブイン */}
            <ReviewSliderField
              name="serve_in"
              label="○サーブイン"
              control={control}
              errors={errors}
              placeholder="サーブイン率を入力"
            />

            {/* リターンイン */}
            <ReviewSliderField
              name="return_in"
              label="○リターンイン"
              control={control}
              errors={errors}
              placeholder="リターンイン率を入力"
            />

            {/* その他メモ */}
            <div className="space-y-2">
              <FormLabel>○その他メモ</FormLabel>
              <Textarea
                className="w-full"
                rows={4}
                placeholder="その他メモを入力"
                {...register("review_memo")}
              />
            </div>
          </form>
        )}
      </BasicModal>
    </>
  );
}
