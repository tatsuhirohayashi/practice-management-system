import { useQuery } from "@tanstack/react-query";
import { listClientConditionQueryAction } from "@/external/handler/condition/client/condition.query.action";
import { clientConditionKeys } from "../../queries/keys";

export function useConditionListQuery() {
  return useQuery({
    queryKey: clientConditionKeys.all,
    queryFn: () => listClientConditionQueryAction(),
  });
}
