import type { UserType } from "@/features/user/type";

export type NotReservedLessonType = {
  id: number;
  user_id: number;
  lesson_day: string; // ISO datetime string
  lesson_location: string;
  lesson_memo: string | null;
  is_reserved: boolean;
  is_confirmed: boolean;
  is_canceled: boolean;
  is_finished: boolean;
  created_at: string;
  updated_at: string;
  user: UserType;
};

export type NotReservedLessonListType = {
  data: NotReservedLessonType[];
};

export type CreateNotReservedLessonRequest = {
  lesson_day: string;
  lesson_time: string;
  lesson_location?: string | null;
  lesson_memo?: string | null;
};

export type UpdateNotReservedLessonRequest = {
  lesson_day: string;
  lesson_time: string;
  lesson_location?: string | null;
  lesson_memo?: string | null;
};

export type CreateNotReservedLessonResponse = {
  data: NotReservedLessonType;
};

export type CreateNotReservedLessonsRequest = {
  lessons: Array<{
    lesson_day: string;
    lesson_location?: string | null;
    lesson_memo?: string | null;
  }>;
};

export type CreateNotReservedLessonsResponse = {
  data: NotReservedLessonType[];
};

export type UpdateNotReservedLessonResponse = {
  data: NotReservedLessonType;
};

export type ReserveLessonRequest = {
  lesson_location: string;
};

export type ReserveLessonResponse = {
  data: NotReservedLessonType;
};

export type NotReservationResponse = {
  data: NotReservedLessonType;
};

// Reserved Lesson Types
export type ReservedLessonType = {
  id: number;
  user_id: number;
  lesson_day: string; // ISO datetime string
  lesson_location: string;
  lesson_memo: string | null;
  is_reserved: boolean;
  is_confirmed: boolean;
  is_canceled: boolean;
  is_finished: boolean;
  created_at: string;
  updated_at: string;
  user: UserType;
};

export type ReservedLessonListType = {
  data: ReservedLessonType[];
};

export type ConfirmReservedLessonResponse = {
  data: ReservedLessonType;
};

export type UnconfirmReservedLessonResponse = {
  data: ReservedLessonType;
};

export type CancelReservedLessonResponse = {
  data: ReservedLessonType;
};

export type UncancelReservedLessonResponse = {
  data: ReservedLessonType;
};
