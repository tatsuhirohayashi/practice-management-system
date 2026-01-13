"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { NotReservedLessonType } from "@/features/lesson/type";
import { useLessonNotReservedListQuery } from "@/features/lesson/hooks/client/useLessonNotReservedListQuery";
import { useCreateNotReservedLessonsMutation } from "@/features/lesson/hooks/client/useCreateNotReservedLessonsMutation";
import { useDeleteNotReservedLessonMutation } from "@/features/lesson/hooks/client/useDeleteNotReservedLessonMutation";
import { useUpdateNotReservedLessonMutation } from "@/features/lesson/hooks/client/useUpdateNotReservedLessonMutation";
import {
  separateLessonDateTime,
  combineLessonDateTime,
} from "@/features/lesson/common/utils";
import { type LessonFormData, lessonFormSchema } from "./schema";

// 一時的なレッスン（作成前）の型
export type DraftLesson = {
  id: string; // 一時的なID（UUIDなど）
  lesson_day: string; // ISO datetime string
  lesson_time: string;
  lesson_location: string | null;
  lesson_memo: string | null;
};

export function useLessonNotReservedList() {
  const { data, isLoading } = useLessonNotReservedListQuery();
  const createLessonsMutation = useCreateNotReservedLessonsMutation();
  const updateMutation = useUpdateNotReservedLessonMutation();
  const deleteMutation = useDeleteNotReservedLessonMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);
  const [selectedLessonForDelete, setSelectedLessonForDelete] = useState<NotReservedLessonType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [draftLessons, setDraftLessons] = useState<DraftLesson[]>([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      lesson_day: "",
      lesson_time: "",
      lesson_location: "",
      lesson_memo: "",
    },
  });

  const openModal = (lessonId?: number) => {
    if (lessonId !== undefined) {
      // 編集モード
      const lesson = data?.data?.find((l) => l.id === lessonId);
      if (!lesson) return;

      setIsEditMode(true);
      setEditingLessonId(lessonId);

      // lesson_dayから日付と時間を分離
      const { date, time } = separateLessonDateTime(lesson.lesson_day);

      // フォームに値を設定
      reset({
        lesson_day: date,
        lesson_time: time,
        lesson_location: lesson.lesson_location || "",
        lesson_memo: lesson.lesson_memo || "",
      });
    } else {
      // 作成モード
      setIsEditMode(false);
      setEditingLessonId(null);
      setDraftLessons([]); // モーダルを開くときに一時リストをクリア
      reset({
        lesson_day: "",
        lesson_time: "",
        lesson_location: "",
        lesson_memo: "",
      });
    }

    setIsModalOpen(true);
  };


  const closeModal = () => {
    reset();
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingLessonId(null);
    setDraftLessons([]); // モーダルを閉じるときに一時リストをクリア
  };

  const addDraftLesson = (formData: LessonFormData) => {
    const combinedDateTime = combineLessonDateTime(formData.lesson_day, formData.lesson_time);

    // 8件の制限チェック
    if (draftLessons.length >= 8) {
      setError("root", {
        type: "manual",
        message: "レッスン候補として登録できるのは一度に8件までです。",
      });
      return;
    }

    // 重複チェック：既存の一時レッスンと同じ日時がないか確認
    const isDuplicateInDrafts = draftLessons.some(
      (draft) => draft.lesson_day === combinedDateTime,
    );
    
    // 重複チェック：APIから取得した既存のレッスン候補と同じ日時がないか確認
    const existingLessons = data?.data ?? [];
    const isDuplicateInExisting = existingLessons.some(
      (lesson) => lesson.lesson_day === combinedDateTime,
    );
    
    if (isDuplicateInDrafts) {
      setError("root", {
        type: "manual",
        message: "同じ日の同じ時間帯のレッスンが既に追加されています。",
      });
      return;
    }
    
    if (isDuplicateInExisting) {
      setError("root", {
        type: "manual",
        message: "同じ日の同じ時間帯のレッスンが既に登録されています。",
      });
      return;
    }
    
    const draftLesson: DraftLesson = {
      id: crypto.randomUUID(),
      lesson_day: combinedDateTime,
      lesson_time: formData.lesson_time,
      lesson_location: formData.lesson_location || null,
      lesson_memo: formData.lesson_memo || null,
    };
    setDraftLessons((prev) => [...prev, draftLesson]);
    // フォームをリセット
    reset({
      lesson_day: "",
      lesson_time: "",
      lesson_location: "",
      lesson_memo: "",
    });
  };

  const removeDraftLesson = (id: string) => {
    setDraftLessons((prev) => prev.filter((lesson) => lesson.id !== id));
  };

  const onSubmit = async (formData: LessonFormData) => {
    if (isEditMode && editingLessonId !== null) {
      // 更新の場合
      const request = {
        lesson_day: combineLessonDateTime(formData.lesson_day, formData.lesson_time),
        lesson_time: formData.lesson_time,
        lesson_location: formData.lesson_location || null,
        lesson_memo: formData.lesson_memo || null,
      };

      try {
        await updateMutation.mutateAsync({
          id: editingLessonId,
          request,
        });
        // 成功したらモーダルを閉じる
        closeModal();
      } catch (error) {
        // エラーハンドリング（必要に応じて実装）
        console.error("レッスン操作エラー:", error);
      }
    } else {
      // 作成モードの場合は一時リストに追加
      addDraftLesson(formData);
    }
  };

  const handleCreateAllDraftLessons = async () => {
    if (draftLessons.length === 0) return;

    try {
      // すべての一時レッスンを一括作成
      const request = {
        lessons: draftLessons.map((draft) => ({
          lesson_day: draft.lesson_day,
          lesson_location: draft.lesson_location,
          lesson_memo: draft.lesson_memo,
        })),
      };

      await createLessonsMutation.mutateAsync(request);
      // 成功したら一時リストをクリアしてモーダルを閉じる
      setDraftLessons([]);
      closeModal();
    } catch (error) {
      // エラーハンドリング（必要に応じて実装）
      console.error("レッスン作成エラー:", error);
    }
  };

  const handleOpenDeleteModal = (lesson: NotReservedLessonType) => {
    setSelectedLessonForDelete(lesson);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedLessonForDelete(null);
  };

  const handleDelete = () => {
    if (selectedLessonForDelete) {
      deleteMutation.mutate(selectedLessonForDelete.id, {
        onSuccess: () => {
          handleCloseDeleteModal();
        },
      });
    }
  };

  return {
    reservedNotLessons: data?.data ?? [],
    isLoading,
    isModalOpen,
    isEditMode,
    openModal,
    closeModal,
    // フォーム関連
    register,
    control,
    handleSubmit,
    errors,
    onSubmit,
    // 削除関連
    selectedLessonForDelete,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
    // 一時レッスン関連
    draftLessons,
    removeDraftLesson,
    handleCreateAllDraftLessons,
  };
}

