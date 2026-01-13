import { redirect } from "next/navigation";
import { getSessionServer } from "@/features/auth/servers/auth.server";
import { clientRoutes, coachRoutes } from "@/shared/navigation";

export default async function Home() {
  const session = await getSessionServer();

  // ログインしていない場合はログインページにリダイレクト
  if (!session?.user) {
    redirect(clientRoutes.login);
  }

  // ログインしている場合は、roleに応じて適切なページにリダイレクト
  // クライアントの場合は予約済みレッスン一覧へ
  // コーチの場合はコーチ用のページへ（必要に応じて実装）
  const userRole = "role" in session.user ? session.user.role : undefined;
  if (userRole === "coach") {
    // コーチ用のページにリダイレクト（必要に応じて実装）
    redirect(coachRoutes.lesson.reserved);
  }

  // デフォルトはクライアントの予約済みレッスン一覧へ
  redirect(clientRoutes.lesson.reserved);
}
