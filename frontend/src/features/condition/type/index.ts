import type { UserType } from "@/features/user/type";

export type ConditionLessonType = {
  id: number;
  lesson_day: string; // ISO datetime string
  lesson_location: string;
  lesson_memo: string | null;
  user: UserType;
  has_condition: boolean;
  condition_id: number | null;
};

export type ConditionLessonListType = {
  data: ConditionLessonType[];
};

export type ConditionDetailType = {
  id: number;
  musle_pain: number;
  motivation: number;
  feeling: number;
  tired: number;
  condition_memo: string | null;
  lesson: {
    id: number;
    lesson_day: string;
    lesson_location: string;
  };
  user: UserType;
};

export type ConditionDetailResponse = {
  data: ConditionDetailType;
};

export type CreateConditionRequest = {
  lesson_id: number;
  musle_pain: number;
  motivation: number;
  feeling: number;
  tired: number;
  condition_memo: string | null;
};

export type CreateConditionResponse = {
  data: ConditionDetailType;
};

export type UpdateConditionRequest = {
  musle_pain: number;
  motivation: number;
  feeling: number;
  tired: number;
  condition_memo: string | null;
};

export type UpdateConditionResponse = {
  data: ConditionDetailType;
};

// Coach Condition Review Types
export type ConditionType = {
  id: number;
  user_id: number;
  musle_pain: number;
  motivation: number;
  feeling: number;
  tired: number;
  condition_memo: string | null;
};

export type ReviewType = {
  id: number;
  user_id: number;
  forehand: number;
  backhand: number;
  serve: number;
  volley: number;
  return: number;
  serve_in: number;
  return_in: number;
  review_memo: string | null;
};

export type LessonConditionReviewType = {
  id: number;
  lesson_day: string;
  lesson_location: string;
  lesson_memo: string | null;
  is_reserved: boolean;
  is_confirmed: boolean;
  is_canceled: boolean;
  is_finished: boolean;
  user: UserType;
  conditions: ConditionType[];
  reviews: ReviewType[];
};

export type LessonConditionReviewResponse = {
  data: LessonConditionReviewType;
};
