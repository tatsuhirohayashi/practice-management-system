"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

interface BasicModalProps {
  open: boolean;
  title: string;
  onClose?: () => void;
  onBack?: () => void;
  onConfirm?: () => void;
  backButtonText?: string;
  confirmButtonText?: string;
  backButtonClassName?: string;
  confirmButtonClassName?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  maxWidth?: string;
}

export function BasicModal({
  open,
  title,
  onClose,
  onBack,
  onConfirm,
  backButtonText = "戻る",
  confirmButtonText = "作成",
  backButtonClassName = "bg-gray-400 text-white flex-1",
  confirmButtonClassName = "bg-blue-500 text-white flex-1",
  children,
  showCloseButton = false,
  maxWidth = "sm:max-w-md",
}: BasicModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={maxWidth}
        showCloseButton={showCloseButton}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {children}
        </div>
        <DialogFooter className="flex-row justify-between gap-2">
          {onBack && (
            <Button className={backButtonClassName} onClick={onBack}>
              {backButtonText}
            </Button>
          )}
          {onConfirm && (
            <Button className={confirmButtonClassName} onClick={onConfirm}>
              {confirmButtonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
