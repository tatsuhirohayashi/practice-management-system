/**
 * 日付を日本語形式にフォーマット
 * @param dateString - ISO形式の日付文字列（例: "2026-01-26 10:00:00"）
 * @returns 日本語形式の日付文字列（例: "2026年1月26日(月)10時~"）
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];

  return `${year}年${month}月${day}日(${weekday})${hour}時~`;
}

/**
 * レッスン詳細表示用の日付と時間をフォーマット
 * @param isoDateTime - ISO形式の日時文字列（例: "2026-01-26 10:00:00"）
 * @returns 日本語形式の日付と時間の文字列（例: "2026年1月26日 (月)  10時~"）
 */
export function formatLessonDetailDateTime(isoDateTime: string): string {
  const date = new Date(isoDateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];
  const hour = date.getHours();

  return `${year}年${month}月${day}日 (${weekday})　${hour}時~`;
}

/**
 * レッスン日までの日数を計算
 * @param lessonDay - ISO形式の日時文字列（例: "2026-01-26 10:00:00"）
 * @returns レッスン日までの日数（レッスン日が過去の場合は負の値）
 */
export function getDaysUntilLesson(lessonDay: string): number {
  const lessonDate = new Date(lessonDay);
  const today = new Date();
  
  // 日付のみを比較（時間を無視）
  lessonDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  // ミリ秒の差分を日数に変換
  const diffTime = lessonDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}
