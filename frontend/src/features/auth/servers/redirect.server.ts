import "server-only";

import { redirect } from "next/navigation";
import { getSessionServer } from "./auth.server";
import { clientRoutes, coachRoutes } from "@/shared/navigation";

export const requireAuthServer = async () => {
  const session = await getSessionServer();
  if (!session?.user) {
    redirect(clientRoutes.login);
  }
};

export const getAuthenticatedSessionServer = async () => {
  const session = await getSessionServer();

  if (!session?.user) {
    redirect(clientRoutes.login);
  }

  // redirect()はneverを返すので、ここに到達した時点でaccountは必ず存在
  return session;
};

/**
 * 認証済みの場合、roleに応じて適切なページにリダイレクト
 */
export const redirectIfAuthenticatedServer = async () => {
  const session = await getSessionServer();

  if (session?.user) {
    const userRole = "role" in session.user ? session.user.role : undefined;
    if (userRole === "coach") {
      redirect(coachRoutes.lesson.reserved);
    } else {
      redirect(clientRoutes.lesson.reserved);
    }
  }
};

/**
 * クライアントroleのみアクセス可能
 * コーチがアクセスした場合はコーチ用のページにリダイレクト
 */
export const requireClientAuthServer = async () => {
  const session = await getSessionServer("client");

  if (!session?.user) {
    redirect(clientRoutes.login);
  }

  const userRole = "role" in session.user ? session.user.role : undefined;

  // コーチがクライアントページにアクセスしようとした場合
  if (userRole === "coach") {
    redirect(coachRoutes.lesson.reserved);
  }

  // クライアントでない場合（roleが未設定など）
  if (userRole !== "client") {
    redirect(clientRoutes.login);
  }
};

/**
 * コーチroleのみアクセス可能
 * クライアントがアクセスした場合はクライアント用のページにリダイレクト
 */
export const requireCoachAuthServer = async () => {
  const session = await getSessionServer("coach");

  if (!session?.user) {
    redirect(coachRoutes.login);
  }

  const userRole = "role" in session.user ? session.user.role : undefined;

  // クライアントがコーチページにアクセスしようとした場合
  if (userRole === "client") {
    redirect(clientRoutes.lesson.reserved);
  }

  // コーチでない場合（roleが未設定など）
  if (userRole !== "coach") {
    redirect(coachRoutes.login);
  }
};
