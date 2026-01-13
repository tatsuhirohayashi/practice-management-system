import { ReviewDetailPageTemplate } from "@/features/review/components/server/client/ReviewDetailPageTemplate/ReviewDetailPageTemplate";

interface ClientReviewDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientReviewDetailPage({
  params,
}: ClientReviewDetailPageProps) {
  const { id } = await params;
  const reviewId = Number(id);

  return <ReviewDetailPageTemplate reviewId={reviewId} />;
}
