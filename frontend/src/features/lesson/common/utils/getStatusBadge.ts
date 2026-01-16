import type { NotReservedLessonType, ReservedLessonType } from "../../type";
import {
  COACH_NOT_RESERVED_LESSON_STATUS,
  COACH_RESERVED_LESSON_STATUS,
  NOT_RESERVED_LESSON_STATUS,
  RESERVED_LESSON_STATUS,
  type StatusBadge,
} from "../constants/lessonStatus";

/**
 * 予約済みレッスンのステータスバッジを取得
 * @param lesson 予約済みレッスン
 * @returns ステータスバッジの情報
 */
export function getReservedLessonStatusBadge(
  lesson: ReservedLessonType,
): StatusBadge {
  if (lesson.is_finished) {
    return RESERVED_LESSON_STATUS.FINISHED;
  }
  if (lesson.is_canceled) {
    return RESERVED_LESSON_STATUS.CANCELED;
  }
  if (lesson.is_confirmed) {
    return RESERVED_LESSON_STATUS.CONFIRMED;
  }
  return RESERVED_LESSON_STATUS.UNCONFIRMED;
}

/**
 * 未予約レッスンのステータスバッジを取得
 * @param lesson 未予約レッスン
 * @returns ステータスバッジの情報
 */
export function getNotReservedLessonStatusBadge(
  lesson: NotReservedLessonType,
): StatusBadge {
  if (lesson.is_finished) {
    return NOT_RESERVED_LESSON_STATUS.FINISHED;
  }
  if (lesson.is_reserved) {
    return NOT_RESERVED_LESSON_STATUS.RESERVED;
  }
  return NOT_RESERVED_LESSON_STATUS.NOT_RESERVED;
}

/**
 * コーチ側の予約済みレッスンのステータスバッジを取得
 * @param lesson 予約済みレッスン
 * @returns ステータスバッジの情報
 */
export function getCoachReservedLessonStatusBadge(
  lesson: ReservedLessonType,
): StatusBadge {
  if (lesson.is_finished) {
    return COACH_RESERVED_LESSON_STATUS.FINISHED;
  }
  if (lesson.is_confirmed) {
    return COACH_RESERVED_LESSON_STATUS.CONFIRMED;
  }
  return COACH_RESERVED_LESSON_STATUS.UNCONFIRMED;
}

/**
 * コーチ側の未予約レッスンのステータスバッジを取得
 * @param lesson 未予約レッスン
 * @returns ステータスバッジの情報
 */
export function getCoachNotReservedLessonStatusBadge(
  lesson: NotReservedLessonType,
): StatusBadge {
  if (lesson.is_finished) {
    return COACH_NOT_RESERVED_LESSON_STATUS.FINISHED;
  }
  if (lesson.is_reserved) {
    return COACH_NOT_RESERVED_LESSON_STATUS.RESERVED;
  }
  return COACH_NOT_RESERVED_LESSON_STATUS.NOT_RESERVED;
}
