<?php

namespace App\Services;

use App\Helpers\ResponseHelper;
use App\Repositories\Interfaces\V2LessonRepositoryInterface;
use App\Repositories\Interfaces\V2ReviewRepositoryInterface;
use App\Repositories\Interfaces\V2UserRepositoryInterface;
use App\Services\Interfaces\V2ReviewServiceInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

class V2ReviewService implements V2ReviewServiceInterface
{
  public function __construct(
    private readonly V2ReviewRepositoryInterface $reviewRepository,
    private readonly V2LessonRepositoryInterface $lessonRepository,
    private readonly V2UserRepositoryInterface $userRepository
  ) {}

  /**
   * Get review list for clients.
   *
   * @param int $userId
   * @return Collection|JsonResponse
   */
  public function getClientReviewList(int $userId): Collection|JsonResponse
  {
    try {
      // 各ドメインのRepositoryからデータを取得
      $lessons = $this->lessonRepository->getByUserId($userId);
      $lessonIds = $lessons->pluck('id')->toArray();
      $reviews = $this->reviewRepository->getByLessonIds($lessonIds);
      $user = $this->userRepository->getById($userId);

      // レビューをlesson_idでキー化（1:1の関係のため）
      $reviewsByLessonId = $reviews->keyBy('lesson_id');

      // 各Lessonにreviewsとuserを設定
      foreach ($lessons as $lesson) {
        $review = $reviewsByLessonId->get($lesson->id);
        $lessonReviews = $review ? new Collection([$review]) : new Collection();
        $lesson->setRelation('reviews', $lessonReviews);
        $lesson->setRelation('user', $user);
      }

      // レッスンが0件の場合も空のコレクションを返す
      return $lessons;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while fetching review list.',
        500,
        $e
      );
    }
  }

  /**
   * Get review detail for clients.
   *
   * @param int $id
   * @param int $userId
   * @return \App\Models\Review|JsonResponse
   */
  public function getClientReviewDetail(int $id, int $userId): \App\Models\Review|JsonResponse
  {
    try {
      // 各ドメインのRepositoryからデータを取得（user_idで絞り込み）
      $review = $this->reviewRepository->findByIdAndUserId($id, $userId);

      if (!$review) {
        return ResponseHelper::notFound('Review not found.');
      }

      $lesson = $this->lessonRepository->findById($review->lesson_id);
      $user = $this->userRepository->getById($review->user_id);

      // Reviewにlessonとuserを設定
      $review->setRelation('lesson', $lesson);
      $review->setRelation('user', $user);

      return $review;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while fetching review detail.',
        500,
        $e
      );
    }
  }

  /**
   * Create a new review for clients.
   *
   * @param array<string, mixed> $data
   * @return \App\Models\Review|JsonResponse
   */
  public function createClientReview(array $data): \App\Models\Review|JsonResponse
  {
    try {
      // 各ドメインのRepositoryからデータを取得
      $review = $this->reviewRepository->create($data);

      $lesson = $this->lessonRepository->findById($review->lesson_id);
      $user = $this->userRepository->getById($review->user_id);

      // Reviewにlessonとuserを設定
      $review->setRelation('lesson', $lesson);
      $review->setRelation('user', $user);

      return $review;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while creating review.',
        500,
        $e
      );
    }
  }

  /**
   * Update a review for clients.
   *
   * @param int $id
   * @param array<string, mixed> $data
   * @return \App\Models\Review|JsonResponse
   */
  public function updateClientReview(int $id, array $data): \App\Models\Review|JsonResponse
  {
    try {
      // user_idで絞り込んでReviewを取得
      $userId = (int)$data['user_id'];
      $review = $this->reviewRepository->findByIdAndUserId($id, $userId);

      if (!$review) {
        return ResponseHelper::notFound('Review not found.');
      }

      // Reviewを更新
      $updatedReview = $this->reviewRepository->update($id, $data);

      if (!$updatedReview) {
        return ResponseHelper::notFound('Review not found.');
      }

      $lesson = $this->lessonRepository->findById($updatedReview->lesson_id);
      $user = $this->userRepository->getById($updatedReview->user_id);

      // Reviewにlessonとuserを設定
      $updatedReview->setRelation('lesson', $lesson);
      $updatedReview->setRelation('user', $user);

      return $updatedReview;
    } catch (\Exception $e) {
      return ResponseHelper::error(
        'An error occurred while updating review.',
        500,
        $e
      );
    }
  }
}
