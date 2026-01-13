/**
 * レッスン時間の選択肢
 * 9:00から19:00まで2時間刻み
 */
export const lessonTimeOptions = [
  "09:00",
  "11:00",
  "13:00",
  "15:00",
  "17:00",
  "19:00",
] as const;

/**
 * レッスン時間の型
 */
export type LessonTimeOption = (typeof lessonTimeOptions)[number];

