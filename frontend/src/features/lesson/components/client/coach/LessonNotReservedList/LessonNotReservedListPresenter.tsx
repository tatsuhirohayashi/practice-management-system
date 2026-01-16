"use client";

import { useState } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { COACH_NOT_RESERVED_LESSON_STATUS_FILTER_OPTIONS } from "@/features/lesson/common/constants";
import {
  formatLessonDate,
  formatLessonTimeRange,
  getCoachNotReservedLessonStatusBadge,
} from "@/features/lesson/common/utils";
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
import { formatDate } from "@/shared/lib/date";
import { formatUserNameFromUser } from "@/shared/lib/user";
import type { ReserveFormData } from "./schema";

interface LessonNotReservedListPresenterProps {
  reservedNotLessons: NotReservedLessonType[];
  isLoading: boolean;
  isModalOpen: boolean;
  selectedLesson: NotReservedLessonType | null;
  onOpenReserveModal: (lesson: NotReservedLessonType) => void;
  onCloseModal: () => void;
  register: UseFormRegister<ReserveFormData>;
  handleSubmit: (
    onSubmit: (data: ReserveFormData) => void,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<ReserveFormData>;
  onSubmit: (data: ReserveFormData) => void;
  selectedLessonForNotReserve: NotReservedLessonType | null;
  isNotReserveModalOpen: boolean;
  onOpenNotReserveModal: (lesson: NotReservedLessonType) => void;
  onCloseNotReserveModal: () => void;
  onNotReserve: () => void;
}

// アクションボタンを取得
const getActionButtons = (
  lesson: NotReservedLessonType,
  onOpenReserveModal: (lesson: NotReservedLessonType) => void,
  onOpenNotReserveModal: (lesson: NotReservedLessonType) => void,
) => {
  if (lesson.is_finished) {
    return <Button className="bg-blue-300 text-sm text-white">振り返り</Button>;
  }
  if (lesson.is_reserved) {
    return (
      <Button
        className="bg-orange-500 text-sm text-white"
        onClick={() => onOpenNotReserveModal(lesson)}
      >
        予約取り消し
      </Button>
    );
  }
  return (
    <Button
      className="bg-green-500 text-sm text-white"
      onClick={() => onOpenReserveModal(lesson)}
    >
      予約済みにする
    </Button>
  );
};

export function LessonNotReservedListPresenter({
  reservedNotLessons,
  isLoading,
  isModalOpen,
  selectedLesson,
  onOpenReserveModal,
  onCloseModal,
  register,
  handleSubmit,
  errors,
  onSubmit,
  selectedLessonForNotReserve,
  isNotReserveModalOpen,
  onOpenNotReserveModal,
  onCloseNotReserveModal,
  onNotReserve,
}: LessonNotReservedListPresenterProps) {
  const [selectedClientId, setSelectedClientId] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // クライアントリストを取得（重複を除去）
  const clients = Array.from(
    new Map(
      reservedNotLessons.map((lesson) => [
        lesson.user.id,
        formatUserNameFromUser(lesson.user, { withHonorific: true }),
      ]),
    ).entries(),
  ).map(([id, name]) => ({ id, name }));

  return (
    <div className="px-12 py-2">
      <h1 className="text-3xl font-bold mb-2 text-center">○レッスン候補日時</h1>
      <p className="text-sm mb-4">
        クライアントのレッスン候補日を一覧で確認できます。
      </p>

      {/* フィルター選択 */}
      <div className="mb-4 flex gap-4">
        <div className="flex-1 max-w-xs">
          <FormLabel>○該当クライアント</FormLabel>
          <Select value={selectedClientId} onValueChange={setSelectedClientId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="クライアントを選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id.toString()}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 max-w-xs">
          <FormLabel>○ステータス</FormLabel>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="ステータスを選択" />
            </SelectTrigger>
            <SelectContent>
              {COACH_NOT_RESERVED_LESSON_STATUS_FILTER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* レッスンリスト */}
      <div className="flex-1 space-y-4">
        {(() => {
          const filteredLessons = reservedNotLessons.filter((lesson) => {
            // クライアントフィルター
            if (selectedClientId !== "all") {
              if (lesson.user.id.toString() !== selectedClientId) {
                return false;
              }
            }
            // ステータスフィルター
            if (selectedStatus !== "all") {
              if (selectedStatus === "finished" && !lesson.is_finished) {
                return false;
              }
              if (
                selectedStatus === "reserved" &&
                (!lesson.is_reserved || lesson.is_finished)
              ) {
                return false;
              }
              if (
                selectedStatus === "not_reserved" &&
                (lesson.is_reserved || lesson.is_finished)
              ) {
                return false;
              }
            }
            return true;
          });

          if (!isLoading && filteredLessons.length === 0) {
            return (
              <div className="text-center py-8 text-gray-500">
                データがありません
              </div>
            );
          }

          return filteredLessons.map((reservedNotLesson) => {
            const statusBadge =
              getCoachNotReservedLessonStatusBadge(reservedNotLesson);
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
                      <div>
                        {reservedNotLesson.lesson_location || "場所未定"}
                      </div>
                    </div>
                    <div>
                      <div>備考 {reservedNotLesson.lesson_memo || ""}</div>
                    </div>
                  </div>
                  {/* アクションボタンパート */}
                  <div className="w-1/8 flex justify-center">
                    {getActionButtons(
                      reservedNotLesson,
                      onOpenReserveModal,
                      onOpenNotReserveModal,
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          });
        })()}
      </div>

      {/* 予約モーダル */}
      <BasicModal
        open={isModalOpen}
        title="○レッスン予約"
        onBack={onCloseModal}
        onConfirm={handleSubmit(onSubmit)}
        onClose={onCloseModal}
        backButtonText="戻る"
        confirmButtonText="予約済み"
        confirmButtonClassName="bg-green-500 text-white flex-1"
        showCloseButton={false}
        maxWidth="sm:max-w-2xl"
      >
        {selectedLesson && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* レッスン日 */}
            <div className="space-y-2">
              <FormLabel>○レッスン日</FormLabel>
              <Input
                type="text"
                className="w-full"
                value={formatLessonDate(selectedLesson.lesson_day)}
                disabled
              />
            </div>

            {/* レッスン時間 */}
            <div className="space-y-2">
              <FormLabel>○レッスン時間</FormLabel>
              <Input
                type="text"
                className="w-full"
                value={formatLessonTimeRange(selectedLesson.lesson_day)}
                disabled
              />
            </div>

            {/* レッスン場所 */}
            <div className="space-y-2">
              <FormLabel required>○レッスン場所</FormLabel>
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
                rows={4}
                value={selectedLesson.lesson_memo || ""}
                disabled
              />
            </div>
            {/* エラーメッセージ */}
            {errors.root?.message && (
              <div className="text-sm text-red-500">{errors.root.message}</div>
            )}
          </form>
        )}
      </BasicModal>

      {/* 予約取り消し確認モーダル */}
      {selectedLessonForNotReserve && (
        <ConfirmModal
          open={isNotReserveModalOpen}
          question="以下のレッスンの予約を取り消してもよろしいですか?"
          lesson={selectedLessonForNotReserve}
          onClose={onCloseNotReserveModal}
          onBack={onCloseNotReserveModal}
          onConfirm={onNotReserve}
          confirmButtonText="予約取り消し"
        />
      )}
    </div>
  );
}
