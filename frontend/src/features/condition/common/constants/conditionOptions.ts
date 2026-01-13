/**
 * コンディション入力フォームの選択肢定義
 */

export interface ConditionOption {
  value: number;
  label: string;
}

/**
 * 筋肉痛の選択肢
 */
export const muslePainOptions: ConditionOption[] = [
  { value: 1, label: "ほとんどない" },
  { value: 2, label: "わずかにある" },
  { value: 3, label: "そこそこある" },
  { value: 4, label: "かなりある" },
  { value: 5, label: "非常にある" },
];

/**
 * モチベーションの選択肢
 */
export const motivationOptions: ConditionOption[] = [
  { value: 1, label: "非常に高い" },
  { value: 2, label: "高い" },
  { value: 3, label: "普通" },
  { value: 4, label: "低い" },
  { value: 5, label: "非常に低い" },
];

/**
 * 気分の選択肢
 */
export const feelingOptions: ConditionOption[] = [
  { value: 1, label: "非常に良い" },
  { value: 2, label: "良い" },
  { value: 3, label: "普通" },
  { value: 4, label: "悪い" },
  { value: 5, label: "非常に悪い" },
];

/**
 * 疲れの選択肢
 */
export const tiredOptions: ConditionOption[] = [
  { value: 1, label: "ほとんどない" },
  { value: 2, label: "わずかにある" },
  { value: 3, label: "そこそこある" },
  { value: 4, label: "かなりある" },
  { value: 5, label: "非常にある" },
];

/**
 * ステータスバッジの情報
 */
export interface StatusBadge {
  text: string;
  className: string;
}

/**
 * コンディションのステータス定義
 */
export const CONDITION_STATUS = {
  RECORDED: {
    text: "記載済",
    className: "bg-gray-400 text-base",
  },
  NOT_RECORDED: {
    text: "未記載",
    className: "bg-gray-400 text-base",
  },
} as const satisfies Record<string, StatusBadge>;

