# API 設計書

## 概要

本ドキュメントは、練習管理システムの API 設計書です。すべてのエンドポイント、リクエスト形式、レスポンス形式を記載しています。

## ベース URL

```
{API_BASE_URL}/api
```

## 認証

現在、認証は実装されていません。リクエストボディに`user_id`を含めることでユーザーを識別します。

## 共通エラーレスポンス

### バリデーションエラー (422)

```json
{
  "message": "Validation failed.",
  "errors": {
    "field_name": ["エラーメッセージ"]
  }
}
```

### 404 Not Found

```json
{
  "message": "Resource not found."
}
```

### 500 Internal Server Error

```json
{
  "message": "An error occurred."
}
```

---

## テスト用エンドポイント

### GET /test

基本的な動作確認用エンドポイント

**リクエスト**

- 認証: 不要
- パラメータ: なし

**レスポンス (200)**

```json
{
  "status": "success",
  "message": "API is working correctly",
  "data": {
    "timestamp": "2024-01-01 00:00:00",
    "environment": "production"
  }
}
```

### GET /test/user

モックユーザーデータを返す

**リクエスト**

- 認証: 不要
- パラメータ: なし

**レスポンス (200)**

```json
{
  "id": 1,
  "email": "test@example.com",
  "role": "client"
}
```

### GET /test/lessons

モックレッスンデータを返す

**リクエスト**

- 認証: 不要
- パラメータ: なし

**レスポンス (200)**

```json
{
  "data": [
    {
      "id": 1,
      "lesson_day": "2024-01-15 10:00:00",
      "lesson_location": "テニスコートA",
      "is_reserved": true,
      "is_confirmed": false,
      "is_canceled": false
    },
    {
      "id": 2,
      "lesson_day": "2024-01-16 14:00:00",
      "lesson_location": "テニスコートB",
      "is_reserved": false,
      "is_confirmed": false,
      "is_canceled": false
    }
  ]
}
```

### GET /test/empty

空の配列を返す

**リクエスト**

- 認証: 不要
- パラメータ: なし

**レスポンス (200)**

```json
{
  "data": []
}
```

---

## 認証・ユーザー管理

### POST /user/login

ユーザーログイン

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**レスポンス (200)**

```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "client"
}
```

**エラーレスポンス (401)**

```json
{
  "message": "Invalid email or password."
}
```

---

## クライアント側 API

### 予約済みレッスン

#### GET /clients/reserved-lessons

予約済みレッスン一覧取得

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1
}
```

**レスポンス (200)**

```json
[
  {
    "id": 1,
    "user_id": 1,
    "lesson_day": "2024-01-15 10:00:00",
    "lesson_location": "テニスコートA",
    "lesson_memo": "メモ",
    "is_reserved": true,
    "is_confirmed": false,
    "is_canceled": false,
    "is_finished": false,
    "created_at": "2024-01-01 00:00:00",
    "updated_at": "2024-01-01 00:00:00",
    "user": {
      "id": 1,
      "first_name": "太郎",
      "last_name": "山田"
    }
  }
]
```

**データが 0 件の場合**

```json
[]
```

#### PUT /clients/reserved-lessons/{id}/confirmed

レッスンの確認状態を確認済みに変更

**リクエスト**

- 認証: 不要
- パラメータ: `id` (レッスン ID)

**レスポンス (200)**

```json
{
  "id": 1,
  "user_id": 1,
  "lesson_day": "2024-01-15 10:00:00",
  "lesson_location": "テニスコートA",
  "lesson_memo": "メモ",
  "is_reserved": true,
  "is_confirmed": true,
  "is_canceled": false,
  "is_finished": false,
  "created_at": "2024-01-01 00:00:00",
  "updated_at": "2024-01-01 00:00:00",
  "user": {
    "id": 1,
    "first_name": "太郎",
    "last_name": "山田"
  }
}
```

#### PUT /clients/reserved-lessons/{id}/not-confirmed

レッスンの確認状態を未確認に変更

**リクエスト**

- 認証: 不要
- パラメータ: `id` (レッスン ID)

**レスポンス (200)**
レッスンリソース（`is_confirmed: false`）

#### PUT /clients/reserved-lessons/{id}/cancel

レッスンをキャンセル

**リクエスト**

- 認証: 不要
- パラメータ: `id` (レッスン ID)

**レスポンス (200)**
レッスンリソース（`is_canceled: true`）

#### PUT /clients/reserved-lessons/{id}/not-cancel

レッスンのキャンセルを解除

**リクエスト**

- 認証: 不要
- パラメータ: `id` (レッスン ID)

**レスポンス (200)**
レッスンリソース（`is_canceled: false`）

---

### 未予約レッスン

#### GET /clients/not-reserved-lessons

未予約レッスン一覧取得

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1
}
```

**レスポンス (200)**

```json
[
  {
    "id": 1,
    "user_id": 1,
    "lesson_day": "2024-01-15 10:00:00",
    "lesson_location": "テニスコートA",
    "lesson_memo": "メモ",
    "is_reserved": false,
    "is_confirmed": false,
    "is_canceled": false,
    "is_finished": false,
    "created_at": "2024-01-01 00:00:00",
    "updated_at": "2024-01-01 00:00:00",
    "user": {
      "id": 1,
      "first_name": "太郎",
      "last_name": "山田"
    }
  }
]
```

**データが 0 件の場合**

```json
[]
```

#### POST /clients/not-reserved-lessons

未予約レッスン作成

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1,
  "lesson_day": "2024-01-20 10:00:00",
  "lesson_location": "テニスコートA",
  "lesson_memo": "メモ"
}
```

**バリデーション**

- `user_id`: 必須、整数、users テーブルに存在
- `lesson_day`: 必須、`Y-m-d H:i:s`形式、1 週間後以降、2 ヶ月後の月末まで
- `lesson_location`: 任意、文字列、最大 50 文字
- `lesson_memo`: 任意、文字列、最大 255 文字

**レスポンス (201)**
レッスンリソース

#### PUT /clients/not-reserved-lessons/{id}

未予約レッスン更新

**リクエスト**

- 認証: 不要
- パラメータ: `id` (レッスン ID)
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1,
  "lesson_day": "2024-01-21 10:00:00",
  "lesson_location": "テニスコートB",
  "lesson_memo": "更新されたメモ"
}
```

**レスポンス (200)**
レッスンリソース

#### DELETE /clients/not-reserved-lessons/{id}

未予約レッスン削除

**リクエスト**

- 認証: 不要
- パラメータ: `id` (レッスン ID)

**レスポンス (200)**

```json
{
  "message": "Lesson deleted successfully."
}
```

---

### コンディション

#### GET /clients/condition-list

コンディション一覧取得

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1
}
```

**レスポンス (200)**

```json
[
  {
    "id": 1,
    "lesson_day": "2024-01-15 10:00:00",
    "lesson_location": "テニスコートA",
    "lesson_memo": "メモ",
    "user": {
      "id": 1,
      "first_name": "太郎",
      "last_name": "山田"
    },
    "has_condition": true,
    "condition_id": 1
  }
]
```

**データが 0 件の場合**

```json
[]
```

#### POST /clients/condition

コンディション作成

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1,
  "lesson_id": 1,
  "musle_pain": 3,
  "motivation": 4,
  "feeling": 5,
  "tired": 2,
  "condition_memo": "調子が良い"
}
```

**バリデーション**

- `user_id`: 必須、整数、users テーブルに存在
- `lesson_id`: 必須、整数、lessons テーブルに存在
- `musle_pain`: 必須、整数、1-5
- `motivation`: 必須、整数、1-5
- `feeling`: 必須、整数、1-5
- `tired`: 必須、整数、1-5
- `condition_memo`: 任意、文字列、最大 200 文字

**レスポンス (201)**

```json
{
  "id": 1,
  "musle_pain": 3,
  "motivation": 4,
  "feeling": 5,
  "tired": 2,
  "condition_memo": "調子が良い",
  "lesson": {
    "id": 1,
    "lesson_day": "2024-01-15 10:00:00",
    "lesson_location": "テニスコートA"
  },
  "user": {
    "id": 1,
    "first_name": "太郎",
    "last_name": "山田"
  }
}
```

#### GET /clients/condition/{id}

コンディション詳細取得

**リクエスト**

- 認証: 不要
- パラメータ: `id` (コンディション ID)
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1
}
```

**レスポンス (200)**
コンディション詳細リソース

#### PUT /clients/condition/{id}

コンディション更新

**リクエスト**

- 認証: 不要
- パラメータ: `id` (コンディション ID)
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1,
  "musle_pain": 4,
  "motivation": 5,
  "feeling": 5,
  "tired": 3,
  "condition_memo": "更新されたメモ"
}
```

**レスポンス (200)**
コンディション詳細リソース

---

### レビュー

#### GET /clients/review-list

レビュー一覧取得

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1
}
```

**レスポンス (200)**

```json
[
  {
    "id": 1,
    "lesson_day": "2024-01-15 10:00:00",
    "lesson_location": "テニスコートA",
    "lesson_memo": "メモ",
    "user": {
      "id": 1,
      "first_name": "太郎",
      "last_name": "山田"
    },
    "has_review": true,
    "review_id": 1
  }
]
```

**データが 0 件の場合**

```json
[]
```

#### POST /clients/review

レビュー作成

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1,
  "lesson_id": 1,
  "forehand": 4,
  "backhand": 3,
  "serve": 5,
  "volley": 4,
  "return": 3,
  "serve_in": 80,
  "return_in": 70,
  "review_memo": "良いレッスンでした"
}
```

**バリデーション**

- `user_id`: 必須、整数、users テーブルに存在
- `lesson_id`: 必須、整数、lessons テーブルに存在
- `forehand`: 必須、整数、1-5
- `backhand`: 必須、整数、1-5
- `serve`: 必須、整数、1-5
- `volley`: 必須、整数、1-5
- `return`: 必須、整数、1-5
- `serve_in`: 必須、整数、0-100
- `return_in`: 必須、整数、0-100
- `review_memo`: 任意、文字列、最大 200 文字

**レスポンス (201)**

```json
{
  "id": 1,
  "forehand": 4,
  "backhand": 3,
  "serve": 5,
  "volley": 4,
  "return": 3,
  "serve_in": 80,
  "return_in": 70,
  "review_memo": "良いレッスンでした",
  "lesson": {
    "id": 1,
    "lesson_day": "2024-01-15 10:00:00",
    "lesson_location": "テニスコートA"
  },
  "user": {
    "id": 1,
    "first_name": "太郎",
    "last_name": "山田"
  },
  "created_at": "2024-01-01 00:00:00",
  "updated_at": "2024-01-01 00:00:00"
}
```

#### GET /clients/review/{id}

レビュー詳細取得

**リクエスト**

- 認証: 不要
- パラメータ: `id` (レビュー ID)
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1
}
```

**レスポンス (200)**
レビュー詳細リソース

#### PUT /clients/review/{id}

レビュー更新

**リクエスト**

- 認証: 不要
- パラメータ: `id` (レビュー ID)
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1,
  "forehand": 5,
  "backhand": 4,
  "serve": 5,
  "volley": 5,
  "return": 4,
  "serve_in": 85,
  "return_in": 75,
  "review_memo": "更新されたメモ"
}
```

**レスポンス (200)**
レビュー詳細リソース

---

## コーチ側 API

### 予約済みレッスン

#### GET /coaches/reserved-lessons

予約済みレッスン一覧取得（コーチのクライアントのレッスン）

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1
}
```

**レスポンス (200)**

```json
[
  {
    "id": 1,
    "user_id": 2,
    "lesson_day": "2024-01-15 10:00:00",
    "lesson_location": "テニスコートA",
    "lesson_memo": "メモ",
    "is_reserved": true,
    "is_confirmed": false,
    "is_canceled": false,
    "is_finished": false,
    "created_at": "2024-01-01 00:00:00",
    "updated_at": "2024-01-01 00:00:00",
    "user": {
      "id": 2,
      "first_name": "花子",
      "last_name": "佐藤"
    }
  }
]
```

**データが 0 件の場合**

```json
[]
```

#### PUT /coaches/reserved-lessons/{id}/cancel

レッスンをキャンセル（予約解除、確認解除、キャンセル状態に変更）

**リクエスト**

- 認証: 不要
- パラメータ: `id` (レッスン ID)

**レスポンス (200)**
レッスンリソース（`is_canceled: true`, `is_reserved: false`, `is_confirmed: false`）

---

### 未予約レッスン

#### GET /coaches/not-reserved-lessons

未予約レッスン一覧取得（コーチのクライアントのレッスン）

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1
}
```

**レスポンス (200)**
レッスンリソースの配列

**データが 0 件の場合**

```json
[]
```

#### PUT /coaches/not-reserved-lessons/{id}/reserve

レッスンを予約済みに変更

**リクエスト**

- 認証: 不要
- パラメータ: `id` (レッスン ID)
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "lesson_location": "テニスコートA"
}
```

**バリデーション**

- `lesson_location`: 必須、文字列、最大 50 文字

**レスポンス (200)**
レッスンリソース（`is_reserved: true`）

#### PUT /coaches/reserved-lessons/{id}/not-reserved

レッスンを未予約に変更

**リクエスト**

- 認証: 不要
- パラメータ: `id` (レッスン ID)

**レスポンス (200)**
レッスンリソース（`is_reserved: false`）

---

### レッスン詳細

#### GET /coaches/lessons/{id}/condition-review

レッスンのコンディションとレビュー情報取得

**リクエスト**

- 認証: 不要
- パラメータ: `id` (レッスン ID)
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1
}
```

**レスポンス (200)**

```json
{
  "id": 1,
  "lesson_day": "2024-01-15 10:00:00",
  "lesson_location": "テニスコートA",
  "lesson_memo": "メモ",
  "is_reserved": true,
  "is_confirmed": false,
  "is_canceled": false,
  "is_finished": false,
  "user": {
    "id": 2,
    "first_name": "花子",
    "last_name": "佐藤"
  },
  "conditions": [
    {
      "id": 1,
      "user_id": 2,
      "musle_pain": 3,
      "motivation": 4,
      "feeling": 5,
      "tired": 2,
      "condition_memo": "調子が良い"
    }
  ],
  "reviews": [
    {
      "id": 1,
      "user_id": 2,
      "forehand": 4,
      "backhand": 3,
      "serve": 5,
      "volley": 4,
      "return": 3,
      "serve_in": 80,
      "return_in": 70,
      "review_memo": "良いレッスンでした"
    }
  ]
}
```

---

### クライアント管理

#### GET /coaches/clients

コーチに紐づくクライアント一覧取得

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1
}
```

**レスポンス (200)**

```json
[
  {
    "id": 2,
    "first_name": "花子",
    "last_name": "佐藤",
    "email": "client@example.com",
    "role": "client",
    "coach_id": 1,
    "created_at": "2024-01-01 00:00:00",
    "updated_at": "2024-01-01 00:00:00"
  }
]
```

**データが 0 件の場合**

```json
[]
```

#### POST /coaches/clients

クライアント作成

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "user_id": 1,
  "first_name": "花子",
  "last_name": "佐藤",
  "email": "client@example.com",
  "password": "password123"
}
```

**バリデーション**

- `user_id`: 必須、整数、users テーブルに存在（コーチの ID）
- `first_name`: 必須、文字列、最大 255 文字
- `last_name`: 必須、文字列、最大 255 文字
- `email`: 必須、メール形式、最大 255 文字、users テーブルでユニーク
- `password`: 必須、文字列、8-600 文字

**レスポンス (201)**

```json
{
  "id": 2,
  "first_name": "花子",
  "last_name": "佐藤",
  "email": "client@example.com",
  "role": "client",
  "coach_id": 1,
  "created_at": "2024-01-01 00:00:00",
  "updated_at": "2024-01-01 00:00:00"
}
```

---

### コーチ登録

#### POST /coaches/register

コーチ会員登録

**リクエスト**

- 認証: 不要
- Content-Type: `application/json`

**リクエストボディ**

```json
{
  "first_name": "太郎",
  "last_name": "山田",
  "email": "coach@example.com",
  "password": "password123"
}
```

**バリデーション**

- `first_name`: 必須、文字列、最大 255 文字
- `last_name`: 必須、文字列、最大 255 文字
- `email`: 必須、メール形式、最大 255 文字、users テーブルでユニーク
- `password`: 必須、文字列、8-600 文字

**レスポンス (201)**

```json
{
  "id": 1,
  "email": "coach@example.com",
  "role": "coach"
}
```

---

## データモデル

### User（ユーザー）

```json
{
  "id": 1,
  "first_name": "太郎",
  "last_name": "山田",
  "email": "user@example.com",
  "role": "coach" | "client",
  "coach_id": null | 1,
  "created_at": "2024-01-01 00:00:00",
  "updated_at": "2024-01-01 00:00:00"
}
```

### Lesson（レッスン）

```json
{
  "id": 1,
  "user_id": 1,
  "lesson_day": "2024-01-15 10:00:00",
  "lesson_location": "テニスコートA",
  "lesson_memo": "メモ",
  "is_reserved": true,
  "is_confirmed": false,
  "is_canceled": false,
  "is_finished": false,
  "created_at": "2024-01-01 00:00:00",
  "updated_at": "2024-01-01 00:00:00"
}
```

### Condition（コンディション）

```json
{
  "id": 1,
  "lesson_id": 1,
  "user_id": 1,
  "musle_pain": 3,
  "motivation": 4,
  "feeling": 5,
  "tired": 2,
  "condition_memo": "調子が良い"
}
```

### Review（レビュー）

```json
{
  "id": 1,
  "lesson_id": 1,
  "user_id": 1,
  "forehand": 4,
  "backhand": 3,
  "serve": 5,
  "volley": 4,
  "return": 3,
  "serve_in": 80,
  "return_in": 70,
  "review_memo": "良いレッスンでした",
  "created_at": "2024-01-01 00:00:00",
  "updated_at": "2024-01-01 00:00:00"
}
```

---

## 注意事項

1. **認証**: 現在、認証は実装されていません。すべてのリクエストで`user_id`をリクエストボディに含める必要があります。

2. **空データ**: 一覧取得 API では、データが 0 件の場合でも空の配列`[]`を返します（404 エラーは返しません）。

3. **日時形式**: すべての日時は`Y-m-d H:i:s`形式（例: `2024-01-15 10:00:00`）で返されます。

4. **レッスン日時の制約**: レッスン作成・更新時、レッスン日時は 1 週間後以降、2 ヶ月後の月末まで指定可能です。

5. **評価値**: コンディションとレビューの評価値は 1-5 の整数です。サーブイン・リターンインは 0-100 の整数（パーセント）です。
