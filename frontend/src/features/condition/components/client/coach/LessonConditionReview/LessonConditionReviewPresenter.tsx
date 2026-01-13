"use client";

import Link from "next/link";
import type { LessonConditionReviewType } from "@/features/condition/type";
import { formatUserNameFromUser } from "@/shared/lib/user";
import { formatLessonDetailDateTime } from "@/shared/lib/date";
import { coachRoutes } from "@/shared/navigation";
import { ConditionRatingItem } from "../ConditionRatingItem";
import { ReviewProgressItem } from "../ReviewProgressItem";

interface LessonConditionReviewPresenterProps {
  lessonData: LessonConditionReviewType | undefined;
  isLoading: boolean;
}

export function LessonConditionReviewPresenter({
  lessonData,
  isLoading,
}: LessonConditionReviewPresenterProps) {
  if (isLoading || !lessonData) {
    return <div>読み込み中...</div>;
  }

  const lessonDisplay = `${formatLessonDetailDateTime(lessonData.lesson_day)}  ${formatUserNameFromUser(lessonData.user, { withHonorific: true })}  ${lessonData.lesson_location}`;

  const condition = lessonData.conditions[0];
  const review = lessonData.reviews[0];

  return (
    <div className="px-12 py-2">
      <Link
        href={coachRoutes.lesson.reserved}
        className="text-blue-500 mb-4 inline-block text-lg"
      >
        ↩︎戻る
      </Link>
      <h1 className="text-3xl font-bold mb-2">○コンディション&振り返り</h1>
      <p className="text-sm mb-4">{lessonDisplay}</p>

      {/* コンディションセクション */}
      <div className="border-2 border-black px-4 py-4 mb-6 space-y-4 bg-white">
        <h2 className="text-xl font-bold mb-4">○コンディション</h2>
        <div className="space-y-3">
          <ConditionRatingItem
            label="○筋肉痛"
            rating={condition?.musle_pain ?? 0}
          />
          <ConditionRatingItem
            label="○モチベーション"
            rating={condition?.motivation ?? 0}
          />
          <ConditionRatingItem
            label="○気分"
            rating={condition?.feeling ?? 0}
          />
          <ConditionRatingItem
            label="○疲れ"
            rating={condition?.tired ?? 0}
          />
        </div>
        {/* 備考 */}
        <div className="space-y-2">
          <span className="text-base">○備考</span>
          <p className="text-base">{condition?.condition_memo || "特になし"}</p>
        </div>
      </div>

      {/* 振り返りセクション */}
      {review && (
        <div className="border-2 border-black px-4 py-4 space-y-4 bg-white">
          <h2 className="text-xl font-bold mb-4">○振り返り</h2>
          <div className="space-y-3">
            <ConditionRatingItem
              label="○フォアハンド"
              rating={review.forehand}
            />
            <ConditionRatingItem
              label="○バックハンド"
              rating={review.backhand}
            />
            <ConditionRatingItem
              label="○サーブ"
              rating={review.serve}
            />
            <ConditionRatingItem
              label="○ボレー"
              rating={review.volley}
            />
            <ConditionRatingItem
              label="○リターン"
              rating={review.return}
            />
          </div>
          <ReviewProgressItem
            label="○サーブイン"
            percentage={review.serve_in}
          />
          <ReviewProgressItem
            label="○リターンイン"
            percentage={review.return_in}
          />
          {/* その他 */}
          <div className="space-y-2">
            <span className="text-base">○その他</span>
            <p className="text-base">{review.review_memo || "特になし"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

