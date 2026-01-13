"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { formatLessonDetailDateTime } from "@/shared/lib/date";
import { formatUserNameFromUser } from "@/shared/lib/user";

interface ConfirmModalProps {
  open: boolean;
  question: string;
  lesson: {
    lesson_day: string;
    user: {
      first_name: string;
      last_name: string;
    };
    lesson_location: string;
    lesson_memo: string | null;
  };
  onClose: () => void;
  onBack: () => void;
  onConfirm: () => void;
  backButtonText?: string;
  confirmButtonText?: string;
  maxWidth?: string;
}

export function ConfirmModal({
  open,
  question,
  lesson,
  onClose,
  onBack,
  onConfirm,
  backButtonText = "戻る",
  confirmButtonText = "確定",
  maxWidth = "sm:max-w-2xl",
}: ConfirmModalProps) {
  const dateTimeDisplay = formatLessonDetailDateTime(lesson.lesson_day);
  const userName = formatUserNameFromUser(lesson.user, { withHonorific: true });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={maxWidth}
        showCloseButton={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {question}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* レッスン詳細情報 */}
          <div className="border-2 border-black px-4 py-4 space-y-2 bg-white">
            <div className="text-base">
              {dateTimeDisplay}  {userName}  {lesson.lesson_location}
            </div>
            <div className="text-base">備考 {lesson.lesson_memo || "~"}</div>
          </div>
        </div>
        <DialogFooter className="flex-row justify-between gap-2">
          <Button
            className="bg-gray-400 text-white flex-1"
            onClick={onBack}
          >
            {backButtonText}
          </Button>
          <Button
            className="bg-blue-500 text-white flex-1"
            onClick={onConfirm}
          >
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

