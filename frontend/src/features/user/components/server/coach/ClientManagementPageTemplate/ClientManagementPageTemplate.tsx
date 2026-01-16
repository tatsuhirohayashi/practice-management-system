import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { listCoachClientQuery } from "@/external/handler/user/coach-client.query.server";
import { coachClientKeys } from "@/features/user/queries/keys";
import { getQueryClient } from "@/shared/lib/query-client";
import { ClientManagement } from "../../../client/coach/ClientManagement";

export async function ClientManagementPageTemplate() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: coachClientKeys.all,
    queryFn: () => listCoachClientQuery(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientManagement />
    </HydrationBoundary>
  );
}
