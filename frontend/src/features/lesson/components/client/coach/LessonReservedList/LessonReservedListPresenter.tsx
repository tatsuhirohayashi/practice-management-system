"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReservedLessonType } from "@/features/lesson/type";
import { FormLabel } from "@/shared/components/custom";
import { ConfirmModal } from "@/shared/components/modal/ConfirmModal";
import { coachRoutes } from "@/shared/navigation";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { formatDate } from "@/shared/lib/date";
import { formatUserNameFromUser } from "@/shared/lib/user";
import { getCoachReservedLessonStatusBadge } from "@/features/lesson/common/utils";
import { COACH_RESERVED_LESSON_STATUS_FILTER_OPTIONS } from "@/features/lesson/common/constants";

interface LessonReservedListPresenterProps {
  reservedLessons: ReservedLessonType[];
  isLoading: boolean;
  selectedLessonForNotReserve: ReservedLessonType | null;
  isNotReserveModalOpen: boolean;
  onOpenNotReserveModal: (lesson: ReservedLessonType) => void;
  onCloseNotReserveModal: () => void;
  onNotReserve: () => void;
  selectedLessonForCancel: ReservedLessonType | null;
  isCancelModalOpen: boolean;
  onOpenCancelModal: (lesson: ReservedLessonType) => void;
  onCloseCancelModal: () => void;
  onCancel: () => void;
}

// アクションボタンを取得
const getActionButtons = (
  lesson: ReservedLessonType,
  onOpenNotReserveModal: (lesson: ReservedLessonType) => void,
  onOpenCancelModal: (lesson: ReservedLessonType) => void,
) => {
  if (lesson.is_finished) {
    return (
      <Link href={coachRoutes.conditionReview.detail(lesson.id)}>
        <Button className="bg-blue-300 text-sm text-white">振り返り</Button>
      </Link>
    );
  }
  if (lesson.is_confirmed) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Button
          className="bg-red-500 text-sm text-white"
          onClick={() => onOpenCancelModal(lesson)}
        >
          キャンセル
        </Button>
        <Link href={coachRoutes.conditionReview.detail(lesson.id)}>
          <Button className="bg-sky-500 text-sm text-white">
            コンディション
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <Button
      className="bg-orange-500 text-sm text-white"
      onClick={() => onOpenNotReserveModal(lesson)}
    >
      予約取り消し
    </Button>
  );
};

export function LessonReservedListPresenter({
  reservedLessons,
  isLoading,
  selectedLessonForNotReserve,
  isNotReserveModalOpen,
  onOpenNotReserveModal,
  onCloseNotReserveModal,
  onNotReserve,
  selectedLessonForCancel,
  isCancelModalOpen,
  onOpenCancelModal,
  onCloseCancelModal,
  onCancel,
}: LessonReservedListPresenterProps) {
  const [selectedClientId, setSelectedClientId] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // クライアントリストを取得（重複を除去）
  const clients = Array.from(
    new Map(
      reservedLessons.map((lesson) => [
        lesson.user.id,
        formatUserNameFromUser(lesson.user, { withHonorific: true }),
      ]),
    ).entries(),
  ).map(([id, name]) => ({ id, name }));

  return (
    <div className="px-12 py-2">
      <h1 className="text-3xl font-bold mb-2 text-center">○予約日時</h1>
      <p className="text-sm mb-4">
        レッスン候補日時から、コーチが予約したレッスンの一覧を見ることができます。
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
              {COACH_RESERVED_LESSON_STATUS_FILTER_OPTIONS.map((option) => (
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
          const filteredLessons = reservedLessons.filter((lesson) => {
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
              if (selectedStatus === "confirmed" && (!lesson.is_confirmed || lesson.is_finished)) {
                return false;
              }
              if (selectedStatus === "unconfirmed" && (lesson.is_confirmed || lesson.is_finished)) {
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

          return filteredLessons.map((reservedLesson) => {
            const statusBadge = getCoachReservedLessonStatusBadge(reservedLesson);
            const userName = formatUserNameFromUser(reservedLesson.user, {
              withHonorific: true,
            });

            return (
              <Card key={reservedLesson.id} className="rounded-lg border-2">
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
                      <div>{formatDate(reservedLesson.lesson_day)}</div>
                      <div>{userName}</div>
                      <div>{reservedLesson.lesson_location}</div>
                    </div>
                    <div>
                      <div>備考 {reservedLesson.lesson_memo}</div>
                    </div>
                  </div>
                  {/* アクションボタンパート */}
                  <div className="w-1/8 flex justify-center">
                    {getActionButtons(
                      reservedLesson,
                      onOpenNotReserveModal,
                      onOpenCancelModal,
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          });
        })()}
      </div>

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

      {/* キャンセル確認モーダル */}
      {selectedLessonForCancel && (
        <ConfirmModal
          open={isCancelModalOpen}
          question="以下のレッスンをキャンセルしてもよろしいですか?"
          lesson={selectedLessonForCancel}
          onClose={onCloseCancelModal}
          onBack={onCloseCancelModal}
          onConfirm={onCancel}
          confirmButtonText="キャンセル"
        />
      )}
    </div>
  );
}

