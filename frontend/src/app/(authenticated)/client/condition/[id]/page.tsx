import { ConditionDetailPageTemplate } from "@/features/condition/components/server/ConditionDetailPageTemplate/ConditionDetailPageTemplate";

interface ClientConditionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientConditionDetailPage({
  params,
}: ClientConditionDetailPageProps) {
  const { id } = await params;
  const conditionId = Number(id);

  return <ConditionDetailPageTemplate conditionId={conditionId} />;
}
