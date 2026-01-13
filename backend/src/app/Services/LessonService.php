<?php

namespace App\Services;

use App\Helpers\ResponseHelper;
use App\Repositories\Interfaces\LessonRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\Interfaces\LessonServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LessonService implements LessonServiceInterface
{
    public function __construct(
        private readonly LessonRepositoryInterface $lessonRepository,
        private readonly UserRepositoryInterface $userRepository
    ) {}

    /**
     * Get lesson condition and review information for coaches.
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function getCoachLessonConditionReview(int $id, Request $request): \App\Models\Lesson|JsonResponse
    {
        try {
            $validated = $request->validated();
            $coachId = (int)$validated['user_id'];
            
            // コーチに紐づくクライアントを取得
            $clients = $this->userRepository->getClientsByCoachId($coachId);
            $clientIds = $clients->pluck('id')->toArray();
            
            if (empty($clientIds)) {
                return ResponseHelper::notFound('No clients found for this coach.');
            }
            
            $lesson = $this->lessonRepository->findByIdWithConditionAndReview($id);

            if (!$lesson) {
                return ResponseHelper::notFound('Lesson not found.');
            }
            
            // レッスンがコーチのクライアントに属するかチェック
            if (!in_array($lesson->user_id, $clientIds)) {
                return ResponseHelper::notFound('Lesson not found for this coach.');
            }

            return $lesson;
        } catch (\Exception $e) {
            return ResponseHelper::handleException(
                $e,
                $request,
                'An error occurred while fetching lesson condition and review information.'
            );
        }
    }
}
