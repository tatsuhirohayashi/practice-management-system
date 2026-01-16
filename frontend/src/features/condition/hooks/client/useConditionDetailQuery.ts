import { useQuery } from "@tanstack/react-query";
import { getClientConditionDetailQueryAction } from "@/external/handler/condition/client/condition.query.action";
import { clientConditionKeys } from "../../queries/keys";

export function useConditionDetailQuery(id: number) {
  return useQuery({
    queryKey: clientConditionKeys.detail(id),
    queryFn: () => getClientConditionDetailQueryAction(id),
    enabled: !!id,
  });
}
