import "server-only";
import { cookies, headers } from "next/headers";
import { auth } from "../lib/better-auth";

/**
 * HttpOnly Cookie に保存されたセッションを取得
 * Server Component / Route Handler 専用
 * better-authのセッションまたは独自のCookieセッションをチェック
 * @param preferredRole - 優先的にチェックするrole（"client" | "coach" | undefined）
 */
export async function getSessionServer(preferredRole?: "client" | "coach") {
  const headerStore = await headers();
  const cookieStore = await cookies();

  // better-authのセッションをチェック
  const session = await auth.api.getSession({
    headers: headerStore,
  });

  // better-authのセッションが存在する場合はそれを返す
  if (session?.user) {
    return session;
  }

  // better-authのセッションが存在しない場合、独自のCookieセッションをチェック
  // クライアントとコーチの両方のセッションをチェック
  const clientSession = cookieStore.get("client_session")?.value;
  const coachSession = cookieStore.get("coach_session")?.value;

  // preferredRoleに応じて優先的にチェック
  if (preferredRole === "coach" && coachSession) {
    try {
      const sessionData = JSON.parse(coachSession);
      if (sessionData?.user) {
        return {
          user: {
            id: sessionData.user.id,
            email: sessionData.user.email,
            role: sessionData.user.role,
          },
        };
      }
    } catch (error) {
      console.error("コーチセッションデータのパースエラー:", error);
    }
  } else if (preferredRole === "client" && clientSession) {
    try {
      const sessionData = JSON.parse(clientSession);
      if (sessionData?.user) {
        return {
          user: {
            id: sessionData.user.id,
            email: sessionData.user.email,
            role: sessionData.user.role,
          },
        };
      }
    } catch (error) {
      console.error("クライアントセッションデータのパースエラー:", error);
    }
  }

  // preferredRoleが指定されていない場合、または優先セッションが存在しない場合
  // 両方のセッションをチェック（コーチを優先）
  if (coachSession) {
    try {
      const sessionData = JSON.parse(coachSession);
      if (sessionData?.user) {
        return {
          user: {
            id: sessionData.user.id,
            email: sessionData.user.email,
            role: sessionData.user.role,
          },
        };
      }
    } catch (error) {
      console.error("コーチセッションデータのパースエラー:", error);
    }
  }

  if (clientSession) {
    try {
      const sessionData = JSON.parse(clientSession);
      if (sessionData?.user) {
        return {
          user: {
            id: sessionData.user.id,
            email: sessionData.user.email,
            role: sessionData.user.role,
          },
        };
      }
    } catch (error) {
      console.error("クライアントセッションデータのパースエラー:", error);
    }
  }

  return null;
}
