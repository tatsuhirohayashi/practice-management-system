/**
 * ユーザー名関連のユーティリティ関数
 */

interface UserNameOptions {
  /**
   * 姓と名の間にスペースを入れるかどうか
   * @default false
   */
  withSpace?: boolean;
  /**
   * 名前に「様」を付けるかどうか
   * @default false
   */
  withHonorific?: boolean;
}

/**
 * 姓と名を結合してユーザー名を作成します
 * @param lastName 姓
 * @param firstName 名
 * @param options オプション
 * @returns 結合されたユーザー名
 */
export function formatUserName(
  lastName: string | null | undefined,
  firstName: string | null | undefined,
  options: UserNameOptions = {},
): string {
  const { withSpace = false, withHonorific = false } = options;

  const last = lastName ?? "";
  const first = firstName ?? "";

  const separator = withSpace ? " " : "";
  const honorific = withHonorific ? "様" : "";

  return `${last}${separator}${first}${honorific}`;
}

/**
 * ユーザーオブジェクトからユーザー名を作成します
 * @param user ユーザーオブジェクト（last_name と first_name を持つ）
 * @param options オプション
 * @returns 結合されたユーザー名
 */
export function formatUserNameFromUser(
  user: { last_name?: string | null; first_name?: string | null },
  options: UserNameOptions = {},
): string {
  return formatUserName(user.last_name, user.first_name, options);
}
