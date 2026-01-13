"use client";

import type { ReservedLessonType } from "@/features/lesson/type";
import { getReservedLessonStatusBadge } from "@/features/lesson/common/utils";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ConfirmModal } from "@/shared/components/modal/ConfirmModal";
import { formatDate, getDaysUntilLesson } from "@/shared/lib/date";
import { formatUserNameFromUser } from "@/shared/lib/user";

interface LessonReservedListPresenterProps {
  reservedLessons: ReservedLessonType[];
  isLoading: boolean;
  selectedLesson: ReservedLessonType | null;
  isConfirmModalOpen: boolean;
  modalType: "confirm" | "unconfirm" | "cancel" | "uncancel";
  onOpenModal: (
    lesson: ReservedLessonType,
    type: "confirm" | "unconfirm" | "cancel" | "uncancel",
  ) => void;
  onCloseConfirmModal: () => void;
  onConfirm: () => void;
  onUnconfirm: () => void;
  onCancel: () => void;
  onUncancel: () => void;
}

export function LessonReservedListPresenter({
  reservedLessons,
  isLoading,
  selectedLesson,
  isConfirmModalOpen,
  modalType,
  onOpenModal,
  onCloseConfirmModal,
  onConfirm,
  onUnconfirm,
  onCancel,
  onUncancel,
}: LessonReservedListPresenterProps) {
  return (
    <>
      <div className="px-12 py-2">
        <h1 className="text-3xl font-bold mb-2 text-center">○予約日時</h1>
        <p className="text-sm mb-4">
          レッスン候補日時から、コーチが予約したレッスンの一覧を見ることができます。
        </p>
        <div className="flex-1 space-y-4">
          {!isLoading && reservedLessons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              データがありません
            </div>
          ) : (
            reservedLessons.map((reservedLesson) => {
            const statusBadge = getReservedLessonStatusBadge(reservedLesson);
            const userName = formatUserNameFromUser(reservedLesson.user, {
              withHonorific: true,
            });
            const daysUntilLesson = getDaysUntilLesson(reservedLesson.lesson_day);
            // 確定/未確定ボタンは7日前まで表示可能
            const canConfirmOrUnconfirm = daysUntilLesson >= 7;
            // キャンセル/キャンセル取り消しボタンは5日前まで表示可能
            const canCancelOrUncancel = daysUntilLesson >= 5;

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
                  {/* ステータス変更パート */}
                  {!reservedLesson.is_finished && (
                    <div className="w-1/8 flex flex-col items-center gap-2">
                      {canConfirmOrUnconfirm && !reservedLesson.is_canceled &&
                        (reservedLesson.is_confirmed ? (
                          <Button
                            className="bg-orange-500 text-sm"
                            onClick={() => onOpenModal(reservedLesson, "unconfirm")}
                          >
                            未確定に戻す
                          </Button>
                        ) : (
                          <Button
                            className="bg-green-500 text-sm"
                            onClick={() => onOpenModal(reservedLesson, "confirm")}
                          >
                            確定にする
                          </Button>
                        ))}
                      {canCancelOrUncancel && reservedLesson.is_confirmed &&
                        (reservedLesson.is_canceled ? (
                          <Button
                            className="bg-gray-400 text-sm"
                            onClick={() => onOpenModal(reservedLesson, "uncancel")}
                          >
                            キャンセル取り消し
                          </Button>
                        ) : (
                          <Button
                            className="bg-red-500 text-sm"
                            onClick={() => onOpenModal(reservedLesson, "cancel")}
                          >
                            キャンセルする
                          </Button>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
          )}
        </div>
      </div>

      {/* 確認モーダル */}
      {selectedLesson && (
        <ConfirmModal
          open={isConfirmModalOpen}
          question={
            modalType === "confirm"
              ? "以下のレッスンを確定させてもよろしいですか?"
              : modalType === "unconfirm"
                ? "以下のレッスンを未確定に戻してもよろしいですか?"
                : modalType === "cancel"
                  ? "以下のレッスンをキャンセルしてもよろしいですか?"
                  : "以下のレッスンのキャンセルを取り消してもよろしいですか?"
          }
          lesson={selectedLesson}
          onClose={onCloseConfirmModal}
          onBack={onCloseConfirmModal}
          onConfirm={
            modalType === "confirm"
              ? onConfirm
              : modalType === "unconfirm"
                ? onUnconfirm
                : modalType === "cancel"
                  ? onCancel
                  : onUncancel
          }
          confirmButtonText={
            modalType === "confirm"
              ? "確定"
              : modalType === "unconfirm"
                ? "未確定に戻す"
                : modalType === "cancel"
                  ? "キャンセルする"
                  : "キャンセル取り消し"
          }
        />
      )}
    </>
  );
}

