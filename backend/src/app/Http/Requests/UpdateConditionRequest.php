<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateConditionRequest extends FormRequest
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
      'musle_pain' => 'required|integer|min:1|max:5',
      'motivation' => 'required|integer|min:1|max:5',
      'feeling' => 'required|integer|min:1|max:5',
      'tired' => 'required|integer|min:1|max:5',
      'condition_memo' => 'nullable|string|max:200',
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
      'musle_pain.required' => '筋肉痛の評価は必須です。',
      'musle_pain.min' => '筋肉痛の評価は1以上である必要があります。',
      'musle_pain.max' => '筋肉痛の評価は5以下である必要があります。',
      'motivation.required' => 'モチベーションの評価は必須です。',
      'motivation.min' => 'モチベーションの評価は1以上である必要があります。',
      'motivation.max' => 'モチベーションの評価は5以下である必要があります。',
      'feeling.required' => '気分の評価は必須です。',
      'feeling.min' => '気分の評価は1以上である必要があります。',
      'feeling.max' => '気分の評価は5以下である必要があります。',
      'tired.required' => '疲れの評価は必須です。',
      'tired.min' => '疲れの評価は1以上である必要があります。',
      'tired.max' => '疲れの評価は5以下である必要があります。',
      'condition_memo.max' => '備考は200文字以内で入力してください。',
    ];
  }
}
