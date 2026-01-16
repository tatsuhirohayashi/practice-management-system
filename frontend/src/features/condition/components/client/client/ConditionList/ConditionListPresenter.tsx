"use client";

import type { Route } from "next";
import Link from "next/link";
import type { useForm } from "react-hook-form";
import {
  CONDITION_STATUS,
  feelingOptions,
  motivationOptions,
  muslePainOptions,
  tiredOptions,
} from "@/features/condition/common/constants";
import { isLessonTodayOrAfter } from "@/features/condition/common/utils";
import type { ConditionLessonType } from "@/features/condition/type";
import { FormLabel } from "@/shared/components/custom";
import { BasicModal } from "@/shared/components/modal/BasicModal";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Textarea } from "@/shared/components/ui/textarea";
import { formatDate, formatLessonDetailDateTime } from "@/shared/lib/date";
import { formatUserNameFromUser } from "@/shared/lib/user";
import { clientRoutes } from "@/shared/navigation";
import { ConditionRadioGroupField } from "../ConditionRadioGroupField/ConditionRadioGroupField";

type ConditionFormData = {
  musle_pain: number;
  motivation: number;
  feeling: number;
  tired: number;
  condition_memo: string;
};

interface ConditionListPresenterProps {
  conditionLessons: ConditionLessonType[];
  isLoading: boolean;
  isModalOpen: boolean;
  selectedLesson: ConditionLessonType | null;
  openCreateModal: (lesson: ConditionLessonType) => void;
  handleCloseModal: () => void;
  register: ReturnType<typeof useForm<ConditionFormData>>["register"];
  control: ReturnType<typeof useForm<ConditionFormData>>["control"];
  handleSubmit: ReturnType<typeof useForm<ConditionFormData>>["handleSubmit"];
  errors: ReturnType<typeof useForm<ConditionFormData>>["formState"]["errors"];
  onSubmit: (data: ConditionFormData) => void;
}

// ステータスに応じたバッジの色とテキストを取得
const getStatusBadge = (lesson: ConditionLessonType) => {
  if (lesson.has_condition) {
    return CONDITION_STATUS.RECORDED;
  }
  return CONDITION_STATUS.NOT_RECORDED;
};

// アクションボタンを取得
const getActionButton = (
  lesson: ConditionLessonType,
  openCreateModal: (lesson: ConditionLessonType) => void,
) => {
  if (lesson.has_condition && lesson.condition_id !== null) {
    return (
      <Link href={clientRoutes.condition.detail(lesson.condition_id) as Route}>
        <Button className="bg-blue-500 text-sm text-white">詳細</Button>
      </Link>
    );
  }

  // レッスン当日以降の場合のみ「記載」ボタンを表示
  if (!isLessonTodayOrAfter(lesson.lesson_day)) {
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

export function ConditionListPresenter({
  conditionLessons,
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
}: ConditionListPresenterProps) {
  return (
    <>
      <div className="px-12 py-2">
        <h1 className="text-3xl font-bold mb-2 text-center">
          ○コンディション一覧
        </h1>
        <p className="text-sm mb-4">
          レッスン前のコンディションの状況を一覧で確認できます。
        </p>

        {/* レッスンリスト */}
        <div className="flex-1 space-y-4">
          {!isLoading && conditionLessons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              データがありません
            </div>
          ) : (
            conditionLessons.map((conditionLesson) => {
              const statusBadge = getStatusBadge(conditionLesson);
              const userName = formatUserNameFromUser(conditionLesson.user, {
                withHonorific: true,
              });

              return (
                <Card key={conditionLesson.id} className="rounded-lg border-2">
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
                        <div>{formatDate(conditionLesson.lesson_day)}</div>
                        <div>{userName}</div>
                        <div>{conditionLesson.lesson_location}</div>
                      </div>
                      <div>
                        <div>備考 {conditionLesson.lesson_memo || ""}</div>
                      </div>
                    </div>
                    {/* アクションボタンパート */}
                    <div className="w-1/8 flex justify-center">
                      {getActionButton(conditionLesson, openCreateModal)}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* コンディション作成モーダル */}
      <BasicModal
        open={isModalOpen}
        title="○コンディションの記入"
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
              レッスン当日のコンディションを記入してください。
            </p>

            {/* レッスン詳細 */}
            <div className="border-2 border-black px-4 py-2 text-base text-left">
              {`${formatLessonDetailDateTime(selectedLesson.lesson_day)}  ${formatUserNameFromUser(selectedLesson.user, { withHonorific: true })}  ${selectedLesson.lesson_location}`}
            </div>

            {/* 筋肉痛 */}
            <ConditionRadioGroupField
              name="musle_pain"
              label="○筋肉痛"
              options={muslePainOptions}
              control={control}
              errors={errors}
              idPrefix="modal"
            />

            {/* モチベーション */}
            <ConditionRadioGroupField
              name="motivation"
              label="○モチベーション"
              options={motivationOptions}
              control={control}
              errors={errors}
              idPrefix="modal"
            />

            {/* 気分 */}
            <ConditionRadioGroupField
              name="feeling"
              label="○気分"
              options={feelingOptions}
              control={control}
              errors={errors}
              idPrefix="modal"
            />

            {/* 疲れ */}
            <ConditionRadioGroupField
              name="tired"
              label="○疲れ"
              options={tiredOptions}
              control={control}
              errors={errors}
              idPrefix="modal"
            />

            {/* 備考 */}
            <div className="space-y-2">
              <FormLabel>○備考</FormLabel>
              <Textarea
                className="w-full"
                rows={4}
                placeholder="備考を入力"
                {...register("condition_memo")}
              />
            </div>
          </form>
        )}
      </BasicModal>
    </>
  );
}
