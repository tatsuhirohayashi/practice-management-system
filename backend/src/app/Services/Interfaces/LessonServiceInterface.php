<?php

namespace App\Services\Interfaces;

use App\Models\Lesson;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

interface LessonServiceInterface
{
    /**
     * Get lesson condition and review information for coaches.
     *
     * @param int $id
     * @param Request $request
     * @return Lesson|JsonResponse
     */
    public function getCoachLessonConditionReview(int $id, Request $request): Lesson|JsonResponse;
}

