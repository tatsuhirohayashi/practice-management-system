import "server-only";
import { getSessionServer } from "./auth.server";

export async function withAuth<T>(
  handler: (ctx: { user_id: string }) => Promise<T>,
  preferredRole?: "client" | "coach",
): Promise<T> {
  const session = await getSessionServer(preferredRole);

  if (!session?.user) {
    throw new Error("Authentication required: No user session found.");
  }

  return handler({ user_id: session.user.id });
}
