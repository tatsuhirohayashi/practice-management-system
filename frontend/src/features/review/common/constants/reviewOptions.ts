/**
 * 振り返り入力フォームの選択肢定義
 */

export interface ReviewOption {
  value: number;
  label: string;
}

/**
 * スキル評価の選択肢
 * UI上では右ほど高い値（5が最高）になるように表示される
 */
export const skillOptions: ReviewOption[] = [
  { value: 5, label: "非常に良い" },
  { value: 4, label: "良い" },
  { value: 3, label: "普通" },
  { value: 2, label: "悪い" },
  { value: 1, label: "非常に調子悪い" },
];

/**
 * ステータスバッジの情報
 */
export interface StatusBadge {
  text: string;
  className: string;
}

/**
 * 振り返りのステータス定義
 */
export const REVIEW_STATUS = {
  RECORDED: {
    text: "記載済",
    className: "bg-gray-400 text-base",
  },
  NOT_RECORDED: {
    text: "未記載",
    className: "bg-gray-400 text-base",
  },
} as const satisfies Record<string, StatusBadge>;

