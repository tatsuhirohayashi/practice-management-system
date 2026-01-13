/**
 * アプリケーションのルート定義
 * ページ遷移で使用するパスを一元管理します。
 */

// Client側のルート
export const clientRoutes = {
  // 認証
  login: "/client/login",
  // コンディション
  condition: {
    list: "/client/condition",
    detail: (id: number) => `/client/condition/${id}`,
  },
  // レッスン
  lesson: {
    reserved: "/client/lesson/reserved",
    notReserved: "/client/lesson/not-reserved",
  },
  // 振り返り
  review: {
    list: "/client/review",
    detail: (id: number) => `/client/review/${id}`,
  },
} as const;

// Coach側のルート
export const coachRoutes = {
  // 認証
  login: "/coach/login",
  register: "/coach/register",
  // クライアント管理
  client: {
    management: "/coach/client",
  },
  // コンディション
  conditionReview: {
    detail: (id: number) => `/coach/condition-review/${id}`,
  },
  // レッスン
  lesson: {
    reserved: "/coach/lesson/reserved",
    notReserved: "/coach/lesson/not-reserved",
  },
} as const;

// 全体のルート
export const routes = {
  client: clientRoutes,
  coach: coachRoutes,
} as const;

