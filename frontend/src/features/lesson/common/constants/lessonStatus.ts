/**
 * レッスンのステータス定義
 */

/**
 * ステータスバッジの情報
 */
export interface StatusBadge {
  text: string;
  className: string;
}

/**
 * 予約済みレッスンのステータス定義
 */
export const RESERVED_LESSON_STATUS = {
  FINISHED: {
    text: "終了",
    className: "bg-gray-400 text-base",
  },
  CANCELED: {
    text: "キャンセル",
    className: "bg-red-500 text-base",
  },
  CONFIRMED: {
    text: "確定",
    className: "bg-green-400 text-base",
  },
  UNCONFIRMED: {
    text: "未確定",
    className: "bg-orange-400 text-base",
  },
} as const satisfies Record<string, StatusBadge>;

/**
 * 未予約レッスンのステータス定義
 */
export const NOT_RESERVED_LESSON_STATUS = {
  FINISHED: {
    text: "終了",
    className: "bg-gray-400 text-base",
  },
  RESERVED: {
    text: "予約済み",
    className: "bg-orange-400 text-base",
  },
  NOT_RESERVED: {
    text: "未予約",
    className: "bg-gray-400 text-base",
  },
} as const satisfies Record<string, StatusBadge>;

/**
 * コーチ側の予約済みレッスンのステータス定義
 */
export const COACH_RESERVED_LESSON_STATUS = {
  FINISHED: {
    text: "終了",
    className: "bg-gray-400 text-base",
  },
  CONFIRMED: {
    text: "確定",
    className: "bg-green-400 text-base",
  },
  UNCONFIRMED: {
    text: "未確定",
    className: "bg-orange-400 text-base",
  },
} as const satisfies Record<string, StatusBadge>;

/**
 * コーチ側の未予約レッスンのステータス定義
 */
export const COACH_NOT_RESERVED_LESSON_STATUS = {
  FINISHED: {
    text: "終了",
    className: "bg-gray-400 text-base",
  },
  RESERVED: {
    text: "予約済み",
    className: "bg-orange-400 text-base",
  },
  NOT_RESERVED: {
    text: "未予約",
    className: "bg-gray-400 text-base",
  },
} as const satisfies Record<string, StatusBadge>;

/**
 * ステータスフィルター用のオプション
 */
export interface StatusFilterOption {
  value: string;
  label: string;
}

/**
 * コーチ側の予約済みレッスンのステータスフィルターオプション
 */
export const COACH_RESERVED_LESSON_STATUS_FILTER_OPTIONS: StatusFilterOption[] = [
  { value: "all", label: "すべて" },
  { value: "finished", label: "終了" },
  { value: "confirmed", label: "確定" },
  { value: "unconfirmed", label: "未確定" },
] as const;

/**
 * コーチ側の未予約レッスンのステータスフィルターオプション
 */
export const COACH_NOT_RESERVED_LESSON_STATUS_FILTER_OPTIONS: StatusFilterOption[] = [
  { value: "all", label: "すべて" },
  { value: "finished", label: "終了" },
  { value: "reserved", label: "予約済み" },
  { value: "not_reserved", label: "未予約" },
] as const;

