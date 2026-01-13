import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getClientConditionDetailQuery } from "@/external/handler/condition/client/condition.query.server";
import { clientConditionKeys } from "@/features/condition/queries/keys";
import { getQueryClient } from "@/shared/lib/query-client";
import { ConditionDetail } from "../../client/client/ConditionDetail";

interface ConditionDetailPageTemplateProps {
  conditionId: number;
}

export async function ConditionDetailPageTemplate({
  conditionId,
}: ConditionDetailPageTemplateProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: clientConditionKeys.detail(conditionId),
    queryFn: () => getClientConditionDetailQuery(conditionId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConditionDetail conditionId={conditionId} />
    </HydrationBoundary>
  );
}

