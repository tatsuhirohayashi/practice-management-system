<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateLessonRequest extends FormRequest
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
        $oneWeekLater = now()->addWeek()->startOfDay();
        $twoMonthsLater = now()->addMonths(2)->endOfMonth()->endOfDay();

        return [
            'user_id' => [
                'required',
                'integer',
                Rule::exists('users', 'id')->where(function ($query) {
                    $query->where('role', 'client');
                }),
            ],
            'lessons' => 'required|array|min:1',
            'lessons.*.lesson_day' => [
                'required',
                'date_format:Y-m-d H:i:s',
                'after_or_equal:' . $oneWeekLater->format('Y-m-d H:i:s'),
                'before_or_equal:' . $twoMonthsLater->format('Y-m-d H:i:s'),
            ],
            'lessons.*.lesson_location' => 'nullable|string|max:50',
            'lessons.*.lesson_memo' => 'nullable|string|max:255',
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
            'lessons.required' => 'レッスン配列は必須です。',
            'lessons.array' => 'レッスンは配列形式で指定してください。',
            'lessons.min' => 'レッスンは1件以上指定してください。',
            'lessons.*.lesson_day.required' => 'レッスン日時は必須です。',
            'lessons.*.lesson_day.date_format' => 'レッスン日時はY-m-d H:i:s形式で指定してください。',
            'lessons.*.lesson_day.after_or_equal' => 'レッスン日時は1週間後以降の日時を指定してください。',
            'lessons.*.lesson_day.before_or_equal' => 'レッスン日時は2ヶ月後の月末まで指定できます。',
        ];
    }
}
