/**
 * 星評価コンポーネント
 */

import type { ReactNode } from "react";

/**
 * 星評価を表示する関数
 * @param rating 評価値（1-5）
 * @returns 星評価のJSX要素
 */
export function renderStars(rating: number): ReactNode {
  return Array.from({ length: 5 }, (_, i) => {
    const starId = `star-${i}-${rating}`;
    return (
      <span
        key={starId}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    );
  });
}
