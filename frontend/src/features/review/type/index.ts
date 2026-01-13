import type { UserType } from "@/features/user/type";

export type ReviewLessonType = {
  id: number;
  lesson_day: string; // ISO datetime string
  lesson_location: string;
  lesson_memo: string | null;
  user: UserType;
  has_review: boolean;
  review_id: number | null;
  is_finished: boolean;
};

export type ReviewLessonListType = {
  data: ReviewLessonType[];
};

export type ReviewDetailType = {
  id: number;
  forehand: number;
  backhand: number;
  serve: number;
  volley: number;
  return: number;
  serve_in: number;
  return_in: number;
  review_memo: string | null;
  lesson: {
    id: number;
    lesson_day: string;
    lesson_location: string;
  };
  user: UserType;
  created_at: string;
  updated_at: string;
};

export type ReviewDetailResponse = {
  data: ReviewDetailType;
};

export type CreateReviewRequest = {
  lesson_id: number;
  forehand: number;
  backhand: number;
  serve: number;
  volley: number;
  return: number;
  serve_in: number;
  return_in: number;
  review_memo: string | null;
};

export type CreateReviewResponse = {
  data: ReviewDetailType;
};

export type UpdateReviewRequest = {
  forehand: number;
  backhand: number;
  serve: number;
  volley: number;
  return: number;
  serve_in: number;
  return_in: number;
  review_memo: string | null;
};

export type UpdateReviewResponse = {
  data: ReviewDetailType;
};
