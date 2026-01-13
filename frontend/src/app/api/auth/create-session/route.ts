import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, email, role } = body;

    // idとemailの存在を確認（idが0の場合も有効なので、undefined/nullのみをチェック）
    if (
      id === undefined ||
      id === null ||
      email === undefined ||
      email === null ||
      email === ""
    ) {
      return NextResponse.json(
        { error: "Invalid request: id and email are required" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();

    // roleに応じてCookie名を決定
    const sessionCookieName =
      role === "coach" ? "coach_session" : "client_session";

    // ユーザー情報をCookieに保存（better-authのセッション形式に合わせる）
    const sessionData = {
      user: {
        id: String(id),
        email,
        role: role || undefined,
      },
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30分後
    };

    cookieStore.set(sessionCookieName, JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 60, // 30分
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("セッション作成エラー:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 },
    );
  }
}
