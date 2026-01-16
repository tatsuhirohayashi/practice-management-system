"use client";

import { renderStars } from "@/shared/components/custom";

interface ConditionRatingItemProps {
  label: string;
  rating: number;
}

export function ConditionRatingItem({
  label,
  rating,
}: ConditionRatingItemProps) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-base">{label}</span>
      <div className="flex text-lg">{renderStars(rating)}</div>
    </div>
  );
}
