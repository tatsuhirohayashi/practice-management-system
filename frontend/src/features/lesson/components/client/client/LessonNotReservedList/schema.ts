import { z } from "zod";
import {
  type LessonTimeOption,
  lessonTimeOptions,
} from "@/features/lesson/common/constants";

// 2ヶ月後の月末を取得する関数
const getTwoMonthsLaterEndOfMonth = (): Date => {
  const now = new Date();
  const twoMonthsLater = new Date(now.getFullYear(), now.getMonth() + 2, 0);
  twoMonthsLater.setHours(23, 59, 59, 999);
  return twoMonthsLater;
};

// 1週間後を取得する関数
const getOneWeekLater = (): Date => {
  const now = new Date();
  const oneWeekLater = new Date(now);
  oneWeekLater.setDate(now.getDate() + 7);
  oneWeekLater.setHours(0, 0, 0, 0);
  return oneWeekLater;
};

// フォームのバリデーションスキーマ
export const lessonFormSchema = z.object({
  lesson_day: z
    .string()
    .min(1, "レッスン日は必須です")
    .refine(
      (dateString) => {
        const selectedDate = new Date(dateString);
        const oneWeekLater = getOneWeekLater();
        const twoMonthsLaterEnd = getTwoMonthsLaterEndOfMonth();

        // 日付が有効かチェック
        if (Number.isNaN(selectedDate.getTime())) {
          return false;
        }

        // 1週間後以降かつ2ヶ月後の月末以前かチェック
        return (
          selectedDate >= oneWeekLater && selectedDate <= twoMonthsLaterEnd
        );
      },
      {
        message: "レッスン日は1週間後から2ヶ月後の月末まで選択できます",
      },
    ),
  lesson_time: z
    .string()
    .min(1, "レッスン時間は必須です")
    .refine((time) => lessonTimeOptions.includes(time as LessonTimeOption), {
      message:
        "レッスン時間は9:00、11:00、13:00、15:00、17:00、19:00から選択してください",
    }),
  lesson_location: z
    .union([
      z.string().max(50, "レッスン場所は50文字以内で入力してください"),
      z.literal(""),
    ])
    .optional(),
  lesson_memo: z
    .union([
      z.string().max(255, "備考は255文字以内で入力してください"),
      z.literal(""),
    ])
    .optional(),
});

export type LessonFormData = z.infer<typeof lessonFormSchema>;
