<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateReviewRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'user_id' => [
        'required',
        'integer',
        Rule::exists('users', 'id')->where(function ($query) {
          $query->where('role', 'client');
        }),
      ],
      'forehand' => 'required|integer|min:1|max:5',
      'backhand' => 'required|integer|min:1|max:5',
      'serve' => 'required|integer|min:1|max:5',
      'volley' => 'required|integer|min:1|max:5',
      'return' => 'required|integer|min:1|max:5',
      'serve_in' => 'required|integer|min:0|max:100',
      'return_in' => 'required|integer|min:0|max:100',
      'review_memo' => 'nullable|string|max:200',
    ];
  }

  /**
   * Get custom messages for validator errors.
   *
   * @return array<string, string>
   */
  public function messages(): array
  {
    return [
      'user_id.required' => 'ユーザーIDは必須です。',
      'user_id.exists' => '指定されたクライアントユーザーが存在しません。',
      'forehand.required' => 'フォアハンドの評価は必須です。',
      'forehand.min' => 'フォアハンドの評価は1以上である必要があります。',
      'forehand.max' => 'フォアハンドの評価は5以下である必要があります。',
      'backhand.required' => 'バックハンドの評価は必須です。',
      'backhand.min' => 'バックハンドの評価は1以上である必要があります。',
      'backhand.max' => 'バックハンドの評価は5以下である必要があります。',
      'serve.required' => 'サーブの評価は必須です。',
      'serve.min' => 'サーブの評価は1以上である必要があります。',
      'serve.max' => 'サーブの評価は5以下である必要があります。',
      'volley.required' => 'ボレーの評価は必須です。',
      'volley.min' => 'ボレーの評価は1以上である必要があります。',
      'volley.max' => 'ボレーの評価は5以下である必要があります。',
      'return.required' => 'リターンの評価は必須です。',
      'return.min' => 'リターンの評価は1以上である必要があります。',
      'return.max' => 'リターンの評価は5以下である必要があります。',
      'serve_in.required' => 'サーブインのパーセントは必須です。',
      'serve_in.min' => 'サーブインのパーセントは0以上である必要があります。',
      'serve_in.max' => 'サーブインのパーセントは100以下である必要があります。',
      'return_in.required' => 'リターンインのパーセントは必須です。',
      'return_in.min' => 'リターンインのパーセントは0以上である必要があります。',
      'return_in.max' => 'リターンインのパーセントは100以下である必要があります。',
      'review_memo.max' => '備考は200文字以内で入力してください。',
    ];
  }
}
