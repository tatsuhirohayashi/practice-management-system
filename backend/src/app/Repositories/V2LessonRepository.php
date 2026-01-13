<?php

namespace App\Repositories;

use App\Models\Lesson;
use App\Repositories\Interfaces\V2LessonRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class V2LessonRepository implements V2LessonRepositoryInterface
{
  /**
   * Get all lessons by user ID.
   *
   * @param int $userId
   * @return Collection<Lesson>
   */
  public function getByUserId(int $userId): Collection
  {
    return Lesson::where('user_id', $userId)
      ->orderBy('lesson_day', 'asc')
      ->get();
  }

  /**
   * Get all reserved lessons by user ID.
   *
   * @param int $userId
   * @return Collection<Lesson>
   */
  public function getReservedByUserId(int $userId): Collection
  {
    return Lesson::where('user_id', $userId)
      ->where('is_reserved', true)
      ->orderBy('lesson_day', 'asc')
      ->get();
  }

  /**
   * Get all reserved lessons by user IDs.
   *
   * @param array<int> $userIds
   * @return Collection<Lesson>
   */
  public function getReservedByUserIds(array $userIds): Collection
  {
    if (empty($userIds)) {
      return new Collection();
    }

    return Lesson::whereIn('user_id', $userIds)
      ->where('is_reserved', true)
      ->orderBy('lesson_day', 'asc')
      ->get();
  }

  /**
   * Get all lessons by user IDs (both reserved and not reserved).
   *
   * @param array<int> $userIds
   * @return Collection<Lesson>
   */
  public function getByUserIds(array $userIds): Collection
  {
    if (empty($userIds)) {
      return new Collection();
    }

    return Lesson::whereIn('user_id', $userIds)
      ->orderBy('lesson_day', 'asc')
      ->get();
  }

  /**
   * Find lesson by ID.
   *
   * @param int $id
   * @return Lesson|null
   */
  public function findById(int $id): ?Lesson
  {
    return Lesson::find($id);
  }

  /**
   * Find lesson by ID and user ID.
   *
   * @param int $id
   * @param int $userId
   * @return Lesson|null
   */
  public function findByIdAndUserId(int $id, int $userId): ?Lesson
  {
    return Lesson::where('id', $id)
      ->where('user_id', $userId)
      ->first();
  }

  /**
   * Find lesson by ID and user IDs.
   *
   * @param int $id
   * @param array<int> $userIds
   * @return Lesson|null
   */
  public function findByIdAndUserIds(int $id, array $userIds): ?Lesson
  {
    if (empty($userIds)) {
      return null;
    }

    return Lesson::where('id', $id)
      ->whereIn('user_id', $userIds)
      ->first();
  }

  /**
   * Create a new lesson.
   *
   * @param array<string, mixed> $data
   * @return Lesson
   */
  public function create(array $data): Lesson
  {
    return Lesson::create($data);
  }

  /**
   * Update a lesson.
   *
   * @param int $id
   * @param array<string, mixed> $data
   * @return Lesson|null
   */
  public function update(int $id, array $data): ?Lesson
  {
    $lesson = Lesson::find($id);
    if (!$lesson) {
      return null;
    }

    $lesson->update($data);
    $lesson->refresh();

    return $lesson;
  }

  /**
   * Delete a lesson.
   *
   * @param int $id
   * @return bool
   */
  public function delete(int $id): bool
  {
    $lesson = Lesson::find($id);
    if (!$lesson) {
      return false;
    }

    return $lesson->delete();
  }

  /**
   * Update lessons that have passed their lesson_day time to finished.
   * 
   * This method processes lessons in batches with transaction support.
   * State transitions are logged for audit purposes.
   *
   * @param int $batchSize Number of lessons to process per batch
   * @return array{total: int, updated: int, skipped: int, errors: array<string>}
   */
  public function updateFinishedLessons(int $batchSize = 100): array
  {
    $now = now();
    $total = 0;
    $updated = 0;
    $skipped = 0;
    $errors = [];

    Log::info('Starting updateFinishedLessons batch process', [
      'timestamp' => $now->toDateTimeString(),
      'batch_size' => $batchSize,
    ]);

    try {
      // Get total count of lessons that need to be updated
      $total = Lesson::where('lesson_day', '<=', $now)
        ->where('is_finished', false)
        ->count();

      Log::info('Found lessons to process', [
        'total_count' => $total,
      ]);

      if ($total === 0) {
        Log::info('No lessons to update');
        return [
          'total' => 0,
          'updated' => 0,
          'skipped' => 0,
          'errors' => [],
        ];
      }

      // Process in batches with transaction
      $offset = 0;
      while ($offset < $total) {
        try {
          $batchResult = DB::transaction(function () use ($now, $batchSize, $offset, &$updated, &$skipped) {
            // Get lessons for this batch
            $lessons = Lesson::where('lesson_day', '<=', $now)
              ->where('is_finished', false)
              ->orderBy('id')
              ->limit($batchSize)
              ->offset($offset)
              ->lockForUpdate() // Prevent concurrent updates
              ->get();

            $batchUpdated = 0;
            $batchSkipped = 0;

            foreach ($lessons as $lesson) {
              try {
                // Idempotency check: Only update if current state is false
                // This ensures the operation is idempotent (can be run multiple times safely)
                if ($lesson->is_finished === true) {
                  Log::debug('Lesson already finished, skipping (idempotency)', [
                    'lesson_id' => $lesson->id,
                    'current_state' => $lesson->is_finished,
                  ]);
                  $batchSkipped++;
                  continue;
                }

                // Explicit state transition: false -> true
                $oldState = $lesson->is_finished;
                $lesson->is_finished = true;
                $lesson->save();

                // Log state transition for audit trail
                Log::info('Lesson state transition', [
                  'lesson_id' => $lesson->id,
                  'user_id' => $lesson->user_id,
                  'lesson_day' => $lesson->lesson_day->toDateTimeString(),
                  'old_state' => $oldState,
                  'new_state' => $lesson->is_finished,
                  'transition_reason' => 'lesson_day_passed',
                  'transition_timestamp' => now()->toDateTimeString(),
                ]);

                $batchUpdated++;
              } catch (\Exception $e) {
                Log::warning('Failed to update individual lesson', [
                  'lesson_id' => $lesson->id,
                  'error' => $e->getMessage(),
                  'trace' => $e->getTraceAsString(),
                ]);
                $batchSkipped++;
              }
            }

            return [
              'updated' => $batchUpdated,
              'skipped' => $batchSkipped,
            ];
          });

          $updated += $batchResult['updated'];
          $skipped += $batchResult['skipped'];

          Log::info('Batch processed', [
            'batch_number' => ($offset / $batchSize) + 1,
            'batch_updated' => $batchResult['updated'],
            'batch_skipped' => $batchResult['skipped'],
            'total_updated' => $updated,
            'total_skipped' => $skipped,
          ]);

          $offset += $batchSize;
        } catch (\Exception $e) {
          $errorMessage = "Batch processing failed at offset {$offset}: " . $e->getMessage();
          $errors[] = $errorMessage;

          Log::error('Batch processing error', [
            'offset' => $offset,
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
          ]);

          // Continue with next batch even if this one failed
          $offset += $batchSize;
        }
      }

      Log::info('Completed updateFinishedLessons batch process', [
        'total' => $total,
        'updated' => $updated,
        'skipped' => $skipped,
        'errors_count' => count($errors),
      ]);

      return [
        'total' => $total,
        'updated' => $updated,
        'skipped' => $skipped,
        'errors' => $errors,
      ];
    } catch (\Exception $e) {
      $errorMessage = 'Fatal error in updateFinishedLessons: ' . $e->getMessage();
      $errors[] = $errorMessage;

      Log::error('Fatal error in updateFinishedLessons', [
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
      ]);

      return [
        'total' => $total,
        'updated' => $updated,
        'skipped' => $skipped,
        'errors' => $errors,
      ];
    }
  }
}
