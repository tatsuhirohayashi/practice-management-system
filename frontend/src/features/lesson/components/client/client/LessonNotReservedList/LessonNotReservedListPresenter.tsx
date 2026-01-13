"use client";

import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { NotReservedLessonType } from "@/features/lesson/type";
import { FormLabel } from "@/shared/components/custom";
import { BasicModal } from "@/shared/components/modal/BasicModal";
import { ConfirmModal } from "@/shared/components/modal/ConfirmModal";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { formatDate, formatLessonDetailDateTime } from "@/shared/lib/date";
import { formatUserNameFromUser } from "@/shared/lib/user";
import { lessonTimeOptions } from "@/features/lesson/common/constants";
import { getNotReservedLessonStatusBadge } from "@/features/lesson/common/utils";
import type { LessonFormData } from "./schema";
import type { DraftLesson } from "./useLessonNotReservedList";

interface LessonNotReservedListPresenterProps {
  reservedNotLessons: NotReservedLessonType[];
  isLoading: boolean;
  isModalOpen: boolean;
  isEditMode: boolean;
  onOpenModal: (lessonId?: number) => void;
  register: UseFormRegister<LessonFormData>;
  control: Control<LessonFormData>;
  handleSubmit: (
    onSubmit: (data: LessonFormData) => void,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<LessonFormData>;
  onSubmit: (data: LessonFormData) => void;
  handleCloseModal: () => void;
  selectedLessonForDelete: NotReservedLessonType | null;
  isDeleteModalOpen: boolean;
  onOpenDeleteModal: (lesson: NotReservedLessonType) => void;
  onCloseDeleteModal: () => void;
  onDelete: () => void;
  draftLessons: DraftLesson[];
  onRemoveDraftLesson: (id: string) => void;
  onCreateAllDraftLessons: () => void;
}


export function LessonNotReservedListPresenter({
  reservedNotLessons,
  isLoading,
  isModalOpen,
  isEditMode,
  onOpenModal,
  register,
  control,
  handleSubmit,
  errors,
  onSubmit,
  handleCloseModal,
  selectedLessonForDelete,
  isDeleteModalOpen,
  onOpenDeleteModal,
  onCloseDeleteModal,
  onDelete,
  draftLessons,
  onRemoveDraftLesson,
  onCreateAllDraftLessons,
}: LessonNotReservedListPresenterProps) {
  // 既存のレッスンからユーザー情報を取得（一時レッスン表示用）
  const currentUser = reservedNotLessons[0]?.user;
  return (
    <>
      <div className="px-12 py-2">
        <h1 className="text-3xl font-bold mb-2 text-center">
          ○レッスン候補日時
        </h1>
        <p className="text-sm mb-4">
          コーチにレッスンしてもらう候補日を作成、更新、削除と一覧を閲覧できます。
        </p>
        <div className="flex justify-end my-2 mr-10">
          <Button
            className="bg-blue-500 text-white"
            onClick={() => onOpenModal()}
          >
            新規作成
          </Button>
        </div>
        <div className="flex-1 space-y-4">
          {!isLoading && reservedNotLessons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              データがありません
            </div>
          ) : (
            reservedNotLessons.map((reservedNotLesson) => {
            const statusBadge = getNotReservedLessonStatusBadge(reservedNotLesson);
            const userName = formatUserNameFromUser(reservedNotLesson.user, {
              withHonorific: true,
            });

            return (
              <Card key={reservedNotLesson.id} className="rounded-lg border-2">
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
                      <div>{formatDate(reservedNotLesson.lesson_day)}</div>
                      <div>{userName}</div>
                      <div>{reservedNotLesson.lesson_location}</div>
                    </div>
                    <div>
                      <div>備考 {reservedNotLesson.lesson_memo}</div>
                    </div>
                  </div>
                  {/* ステータス変更パート */}
                  {!reservedNotLesson.is_reserved && !reservedNotLesson.is_finished && (
                    <div className="w-1/8 flex flex-col items-center gap-2">
                      <Button
                        className="bg-blue-400 text-sm"
                        onClick={() => onOpenModal(reservedNotLesson.id)}
                      >
                        編集
                      </Button>
                      <Button
                        className="bg-red-500 text-sm"
                        onClick={() => onOpenDeleteModal(reservedNotLesson)}
                      >
                        削除
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
          )}
        </div>
      </div>

      {/* レッスン候補作成/編集モーダル */}
      <BasicModal
        open={isModalOpen}
        title={isEditMode ? "○レッスン候補の編集" : "○レッスン候補の作成"}
        onBack={handleCloseModal}
        onConfirm={isEditMode ? handleSubmit(onSubmit) : onCreateAllDraftLessons}
        onClose={handleCloseModal}
        confirmButtonText={isEditMode ? "編集" : "作成"}
        showCloseButton={false}
        maxWidth="sm:max-w-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* レッスン日 */}
          <div className="space-y-2">
            <FormLabel required>○レッスン日</FormLabel>
            <Input type="date" className="w-full" {...register("lesson_day")} />
            {errors.lesson_day && (
              <p className="text-sm text-red-500">
                {errors.lesson_day.message}
              </p>
            )}
          </div>

          {/* レッスン時間 */}
          <div className="space-y-2">
            <FormLabel required>○レッスン時間</FormLabel>
            <Controller
              name="lesson_time"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="時間を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessonTimeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.lesson_time && (
              <p className="text-sm text-red-500">
                {errors.lesson_time.message}
              </p>
            )}
          </div>

          {/* レッスン場所 */}
          <div className="space-y-2">
            <FormLabel>○レッスン場所</FormLabel>
            <Input
              type="text"
              className="w-full"
              placeholder="レッスン場所を入力"
              {...register("lesson_location")}
            />
            {errors.lesson_location && (
              <p className="text-sm text-red-500">
                {errors.lesson_location.message}
              </p>
            )}
          </div>

          {/* 備考 */}
          <div className="space-y-2">
            <FormLabel>○備考</FormLabel>
            <Textarea
              className="w-full"
              placeholder="備考を入力"
              rows={4}
              {...register("lesson_memo")}
            />
            {errors.lesson_memo && (
              <p className="text-sm text-red-500">
                {errors.lesson_memo.message}
              </p>
            )}
          </div>
          {!isEditMode && (
            <div className="space-y-2">
              {errors.root && (
                <p className="text-sm text-red-500">{errors.root.message}</p>
              )}
              <div className="flex justify-end">
                <Button
                  type="button"
                  className="bg-green-500 text-white"
                  onClick={handleSubmit(onSubmit)}
                >
                  追加
                </Button>
              </div>
            </div>
          )}
        </form>

        {/* 一時レッスン一覧（作成モードのみ） */}
        {!isEditMode && draftLessons.length > 0 && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">作成予定のレッスン</h3>
              {draftLessons.length >= 8 && (
                <p className="text-sm text-gray-600">
                  レッスン候補として登録できるのは一度に8件までです
                </p>
              )}
            </div>
            {draftLessons.map((draftLesson) => {
              const userName = currentUser
                ? formatUserNameFromUser(currentUser, { withHonorific: true })
                : "";

              return (
                <div
                  key={draftLesson.id}
                  className="border-2 border-black px-4 py-4 bg-white flex items-center justify-between"
                >
                  <div className="flex-1 space-y-2">
                    <div className="text-base">
                      {formatLessonDetailDateTime(draftLesson.lesson_day)}  {userName}  {draftLesson.lesson_location || ""}
                    </div>
                    <div className="text-base">備考 {draftLesson.lesson_memo || ""}</div>
                  </div>
                  <Button
                    type="button"
                    className="bg-red-500 text-sm text-white ml-4"
                    onClick={() => onRemoveDraftLesson(draftLesson.id)}
                  >
                    削除
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </BasicModal>

      {/* 削除確認モーダル */}
      {selectedLessonForDelete && (
        <ConfirmModal
          open={isDeleteModalOpen}
          question="以下のレッスンを削除してもよろしいですか?"
          lesson={selectedLessonForDelete}
          onClose={onCloseDeleteModal}
          onBack={onCloseDeleteModal}
          onConfirm={onDelete}
          confirmButtonText="削除"
        />
      )}
    </>
  );
}

