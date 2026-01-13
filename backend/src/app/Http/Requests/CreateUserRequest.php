<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateUserRequest extends FormRequest
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|max:600',
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
            'first_name.required' => '名前（姓）は必須です。',
            'first_name.string' => '名前（姓）は文字列で指定してください。',
            'first_name.max' => '名前（姓）は255文字以内で指定してください。',
            'last_name.required' => '名前（名）は必須です。',
            'last_name.string' => '名前（名）は文字列で指定してください。',
            'last_name.max' => '名前（名）は255文字以内で指定してください。',
            'email.required' => 'メールアドレスは必須です。',
            'email.email' => '有効なメールアドレスを指定してください。',
            'email.unique' => 'このメールアドレスは既に使用されています。',
            'email.max' => 'メールアドレスは255文字以内で指定してください。',
            'password.required' => 'パスワードは必須です。',
            'password.min' => 'パスワードは8文字以上である必要があります。',
            'password.max' => 'パスワードは600文字以内で指定してください。',
        ];
    }
}

