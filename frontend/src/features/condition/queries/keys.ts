export const clientConditionKeys = {
  all: ["condition"] as const,
  detail: (id: number) => [...clientConditionKeys.all, "detail", id] as const,
};

export const coachLessonConditionReviewKeys = {
  all: ["lesson-condition-review"] as const,
  detail: (id: number) =>
    [...coachLessonConditionReviewKeys.all, "detail", id] as const,
};
