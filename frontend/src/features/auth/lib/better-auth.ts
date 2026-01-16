import "server-only";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  /**
   * =========================
   * セッション設定
   * =========================
   * DBを使わない stateless mode
   * セッション情報は Cookie に保存
   */
  session: {
    strategy: "cookie",

    cookie: {
      name: "app_session",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },

    /**
     * Cookieセッションのサーバー側キャッシュ
     * Server Component の多重呼び出し対策
     */
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5分
    },
  },

  /**
   * =========================
   * 認証方法（email / password）
   * ※ DB実装は省略（ここでは例）
   * =========================
   */
  providers: {
    credentials: {
      async authorize({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) {
        /**
         * ここで本来は
         * - Laravel管理DBを参照
         * - password を bcrypt 比較
         */

        // 仮実装（成功時の最小セッション情報）
        if (email && password) {
          return {
            id: "user_1",
            email,
            role: "client", // デフォルトのrole（実際のログインAPIから取得した値が使用される）
          };
        }

        return null;
      },
    },
  },
});
