<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lesson extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'lesson_day',
        'lesson_location',
        'lesson_memo',
        'is_reserved',
        'is_confirmed',
        'is_canceled',
        'is_finished',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'lesson_day' => 'datetime',
            'is_reserved' => 'boolean',
            'is_confirmed' => 'boolean',
            'is_canceled' => 'boolean',
            'is_finished' => 'boolean',
        ];
    }

    /**
     * Get the user that owns the lesson.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the conditions for this lesson.
     */
    public function conditions()
    {
        return $this->hasMany(Condition::class);
    }

    /**
     * Get the reviews for this lesson.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}

