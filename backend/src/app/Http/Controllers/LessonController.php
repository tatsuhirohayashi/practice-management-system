<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetCoachLessonConditionReviewRequest;
use App\Http\Resources\LessonConditionReviewResource;
use App\Services\Interfaces\LessonServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function __construct(
        private readonly LessonServiceInterface $lessonService
    ) {}

    /**
     * Get lesson condition and review information for coaches.
     */
    public function getCoachLessonConditionReview(int $id, GetCoachLessonConditionReviewRequest $request): JsonResponse
    {
        $result = $this->lessonService->getCoachLessonConditionReview($id, $request);

        if ($result instanceof JsonResponse) {
            return $result;
        }

        return LessonConditionReviewResource::make($result)->response()->setStatusCode(200);
    }
}

