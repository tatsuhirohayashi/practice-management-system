/**
 * レッスンが当日かどうかを判定
 * @param lessonDay - ISO形式の日時文字列（例: "2026-01-26 10:00:00"）
 * @returns レッスンが当日の場合true、それ以外の場合false
 */
export function isLessonToday(lessonDay: string): boolean {
  const lessonDate = new Date(lessonDay);
  const today = new Date();

  return (
    lessonDate.getFullYear() === today.getFullYear() &&
    lessonDate.getMonth() === today.getMonth() &&
    lessonDate.getDate() === today.getDate()
  );
}

/**
 * レッスンが当日以降かどうかを判定
 * @param lessonDay - ISO形式の日時文字列（例: "2026-01-26 10:00:00"）
 * @returns レッスンが当日以降の場合true、それ以外の場合false
 */
export function isLessonTodayOrAfter(lessonDay: string): boolean {
  const lessonDate = new Date(lessonDay);
  const today = new Date();
  
  // 日付のみを比較（時間を無視）
  lessonDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return lessonDate.getTime() <= today.getTime();
}

