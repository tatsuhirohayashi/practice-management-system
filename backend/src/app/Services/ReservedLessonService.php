<?php

namespace App\Services;

use App\Helpers\ResponseHelper;
use App\Repositories\Interfaces\LessonRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\Interfaces\ReservedLessonServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReservedLessonService implements ReservedLessonServiceInterface
{
    public function __construct(
        private readonly LessonRepositoryInterface $lessonRepository,
        private readonly UserRepositoryInterface $userRepository
    ) {}

    /**
     * Get all reserved lessons for clients.
     *
     * @param Request $request
     * @return Collection|JsonResponse
     */
    public function getClientReservedLessons(Request $request): Collection|JsonResponse
    {
        try {
            $validated = $request->validated();
            $userId = (int)$validated['user_id'];
            $lessons = $this->lessonRepository->getReservedLessons($userId);

            // レッスンが0件の場合も空のコレクションを返す
            return $lessons;
        } catch (\Exception $e) {
            return ResponseHelper::handleException(
                $e,
                $request,
                'An error occurred while fetching reserved lessons.'
            );
        }
    }

    /**
     * Get all reserved lessons for coaches.
     *
     * @param Request $request
     * @return Collection|JsonResponse
     */
    public function getCoachReservedLessons(Request $request): Collection|JsonResponse
    {
        try {
            $validated = $request->validated();
            $coachId = (int)$validated['user_id'];
            
            // コーチに紐づくクライアントを取得
            $clients = $this->userRepository->getClientsByCoachId($coachId);
            $clientIds = $clients->pluck('id')->toArray();
            
            // クライアントが0件の場合は空のコレクションを返す
            if (empty($clientIds)) {
                return new \Illuminate\Database\Eloquent\Collection([]);
            }
            
            // クライアントのレッスンを取得
            $lessons = $this->lessonRepository->getReservedLessons(null, $clientIds);

            // レッスンが0件の場合も空のコレクションを返す
            return $lessons;
        } catch (\Exception $e) {
            return ResponseHelper::handleException(
                $e,
                $request,
                'An error occurred while fetching reserved lessons.'
            );
        }
    }

    /**
     * Confirm a reserved lesson (set is_confirmed to true).
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function confirmClientReservedLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse
    {
        try {
            // レッスンが存在し、かつ予約済みであることを確認
            $lesson = $this->lessonRepository->findById($id);
            if (!$lesson) {
                return ResponseHelper::notFound('Lesson not found.');
            }

            if (!$lesson->is_reserved) {
                return ResponseHelper::error('Cannot confirm a lesson that is not reserved.', 400);
            }

            if ($lesson->is_confirmed) {
                return ResponseHelper::error('Lesson is already confirmed.', 400);
            }

            $updatedLesson = $this->lessonRepository->update($id, ['is_confirmed' => true]);

            if (!$updatedLesson) {
                return ResponseHelper::notFound('Lesson not found.');
            }

            return $updatedLesson;
        } catch (\Exception $e) {
            return ResponseHelper::handleException(
                $e,
                $request,
                'An error occurred while confirming reserved lesson.'
            );
        }
    }

    /**
     * Unconfirm a reserved lesson (set is_confirmed to false).
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function unconfirmClientReservedLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse
    {
        try {
            // レッスンが存在し、かつ予約済みであることを確認
            $lesson = $this->lessonRepository->findById($id);
            if (!$lesson) {
                return ResponseHelper::notFound('Lesson not found.');
            }

            if (!$lesson->is_reserved) {
                return ResponseHelper::error('Cannot unconfirm a lesson that is not reserved.', 400);
            }

            if (!$lesson->is_confirmed) {
                return ResponseHelper::error('Lesson is already unconfirmed.', 400);
            }

            $updatedLesson = $this->lessonRepository->update($id, ['is_confirmed' => false]);

            if (!$updatedLesson) {
                return ResponseHelper::notFound('Lesson not found.');
            }

            return $updatedLesson;
        } catch (\Exception $e) {
            return ResponseHelper::handleException(
                $e,
                $request,
                'An error occurred while unconfirming reserved lesson.'
            );
        }
    }

    /**
     * Cancel a lesson (set is_canceled to true).
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function cancelClientReservedLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse
    {
        try {
            // レッスンが存在することを確認
            $lesson = $this->lessonRepository->findById($id);
            if (!$lesson) {
                return ResponseHelper::notFound('Lesson not found.');
            }

            if ($lesson->is_canceled) {
                return ResponseHelper::error('Lesson is already canceled.', 400);
            }

            $updatedLesson = $this->lessonRepository->update($id, ['is_canceled' => true]);

            if (!$updatedLesson) {
                return ResponseHelper::notFound('Lesson not found.');
            }

            return $updatedLesson;
        } catch (\Exception $e) {
            return ResponseHelper::handleException(
                $e,
                $request,
                'An error occurred while canceling lesson.'
            );
        }
    }

    /**
     * Not cancel a lesson (set is_canceled to false).
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function notCancelClientReservedLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse
    {
        try {
            // レッスンが存在することを確認
            $lesson = $this->lessonRepository->findById($id);
            if (!$lesson) {
                return ResponseHelper::notFound('Lesson not found.');
            }

            if (!$lesson->is_canceled) {
                return ResponseHelper::error('Lesson is already not canceled.', 400);
            }

            $updatedLesson = $this->lessonRepository->update($id, ['is_canceled' => false]);

            if (!$updatedLesson) {
                return ResponseHelper::notFound('Lesson not found.');
            }

            return $updatedLesson;
        } catch (\Exception $e) {
            return ResponseHelper::handleException(
                $e,
                $request,
                'An error occurred while not canceling lesson.'
            );
        }
    }

    /**
     * Cancel a lesson for coaches (set is_canceled to true, is_reserved to false, is_confirmed to false).
     *
     * @param int $id
     * @param Request $request
     * @return \App\Models\Lesson|JsonResponse
     */
    public function cancelCoachReservedLesson(int $id, Request $request): \App\Models\Lesson|JsonResponse
    {
        try {
            // レッスンが存在することを確認
            $lesson = $this->lessonRepository->findById($id);
            if (!$lesson) {
                return ResponseHelper::notFound('Lesson not found.');
            }

            if ($lesson->is_canceled) {
                return ResponseHelper::error('Lesson is already canceled.', 400);
            }

            $updatedLesson = $this->lessonRepository->update($id, [
                'is_canceled' => true,
                'is_reserved' => false,
                'is_confirmed' => false,
            ]);

            if (!$updatedLesson) {
                return ResponseHelper::notFound('Lesson not found.');
            }

            return $updatedLesson;
        } catch (\Exception $e) {
            return ResponseHelper::handleException(
                $e,
                $request,
                'An error occurred while canceling lesson.'
            );
        }
    }
}
