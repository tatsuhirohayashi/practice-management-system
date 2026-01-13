import "server-only";

import { fetchCoachClientList } from "@/external/service/user/user.service";
import { withAuth } from "@/features/auth/servers/auth.guard";
import type { ClientListType } from "@/features/user/type";

export const listCoachClientQuery = (): Promise<ClientListType> => {
  return withAuth(({ user_id }) => fetchCoachClientList(user_id), "coach");
};
