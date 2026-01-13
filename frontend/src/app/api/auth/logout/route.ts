import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionServer } from "@/features/auth/servers/auth.server";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // セッションを削除する前にroleを取得
    const session = await getSessionServer();
    const userRole =
      session?.user && "role" in session.user ? session.user.role : undefined;

    // roleに応じたセッションCookieのみを削除
    if (userRole === "coach") {
      cookieStore.delete("coach_session");
    } else {
      cookieStore.delete("client_session");
    }

    // roleに応じたログインページのパスを返す
    const loginPath = userRole === "coach" ? "/coach/login" : "/client/login";

    return NextResponse.json({ success: true, loginPath });
  } catch (error) {
    console.error("ログアウトエラー:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
