"use client";

interface ReviewProgressItemProps {
  label: string;
  percentage: number;
}

export function ReviewProgressItem({
  label,
  percentage,
}: ReviewProgressItemProps) {
  return (
    <div className="space-y-2">
      <span className="text-base">{label}</span>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-gray-400 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-base">{percentage}%</span>
      </div>
    </div>
  );
}

