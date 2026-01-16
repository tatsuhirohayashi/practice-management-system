/**
 * レッスンの日付と時間を扱うユーティリティ関数
 */

/**
 * ISO datetime文字列から日付と時間を分離
 * @param isoDateTime ISO形式の日時文字列（例: "2026-01-26 10:00:00"）
 * @returns 日付（YYYY-MM-DD形式）と時間（HH:MM形式）のオブジェクト
 */
export function separateLessonDateTime(isoDateTime: string): {
  date: string;
  time: string;
} {
  const lessonDate = new Date(isoDateTime);
  const year = lessonDate.getFullYear();
  const month = String(lessonDate.getMonth() + 1).padStart(2, "0");
  const day = String(lessonDate.getDate()).padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;

  const hours = String(lessonDate.getHours()).padStart(2, "0");
  const minutes = String(lessonDate.getMinutes()).padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  return {
    date: dateString,
    time: timeString,
  };
}

/**
 * 日付と時間を結合してISO datetime文字列を作成
 * @param date 日付文字列（YYYY-MM-DD形式）
 * @param time 時間文字列（HH:MM形式）
 * @returns ISO形式の日時文字列（例: "2026-01-26 10:00:00"）
 */
export function combineLessonDateTime(date: string, time: string): string {
  return `${date} ${time}:00`;
}

/**
 * ISO datetime文字列を日本語形式の日付文字列に変換
 * @param isoDateTime ISO形式の日時文字列（例: "2026-01-26 10:00:00"）
 * @returns 日本語形式の日付文字列（例: "2026年1月26日 (月)"）
 */
export function formatLessonDate(isoDateTime: string): string {
  const date = new Date(isoDateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekday = weekdays[date.getDay()];
  return `${year}年${month}月${day}日 (${weekday})`;
}

/**
 * ISO datetime文字列からレッスン時間の範囲を取得
 * @param isoDateTime ISO形式の日時文字列（例: "2026-01-26 10:00:00"）
 * @param durationHours レッスンの時間（時間単位、デフォルト: 2）
 * @returns 時間範囲の文字列（例: "10:00~12:00"）
 */
export function formatLessonTimeRange(
  isoDateTime: string,
  durationHours: number = 2,
): string {
  const date = new Date(isoDateTime);
  const startHour = date.getHours();
  const endHour = startHour + durationHours;
  return `${String(startHour).padStart(2, "0")}:00~${String(endHour).padStart(2, "0")}:00`;
}
