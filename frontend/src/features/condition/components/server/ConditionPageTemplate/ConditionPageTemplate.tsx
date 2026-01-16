import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { listClientConditionQuery } from "@/external/handler/condition/client/condition.query.server";
import { clientConditionKeys } from "@/features/condition/queries/keys";
import { getQueryClient } from "@/shared/lib/query-client";
import { ConditionList } from "../../client/client/ConditionList";

export async function ConditionListPageTemplate() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: clientConditionKeys.all,
    queryFn: () => listClientConditionQuery(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ConditionList />
    </HydrationBoundary>
  );
}
