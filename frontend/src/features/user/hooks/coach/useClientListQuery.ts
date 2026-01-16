import { useQuery } from "@tanstack/react-query";
import { listCoachClientQueryAction } from "@/external/handler/user/coach-client.query.action";
import { coachClientKeys } from "../../queries/keys";

export function useClientListQuery() {
  return useQuery({
    queryKey: coachClientKeys.all,
    queryFn: () => listCoachClientQueryAction(),
  });
}
