export const clientReviewKeys = {
  all: ["review"] as const,
  detail: (id: number) => [...clientReviewKeys.all, "detail", id] as const,
};
