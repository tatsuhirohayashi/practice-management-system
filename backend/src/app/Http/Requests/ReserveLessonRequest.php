<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReserveLessonRequest extends FormRequest
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
      'lesson_location' => 'required|string|max:50',
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
      'lesson_location.required' => 'レッスン場所は必須です。',
      'lesson_location.string' => 'レッスン場所は文字列で指定してください。',
      'lesson_location.max' => 'レッスン場所は50文字以内で指定してください。',
    ];
  }
}
