<?php

namespace App\Console\Commands;

use App\Repositories\Interfaces\V2LessonRepositoryInterface;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class UpdateFinishedLessonsCommand extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'lessons:update-finished {--batch-size=100 : Number of lessons to process per batch}';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Update lessons that have passed their lesson_day time to finished';

  /**
   * Lock key for preventing concurrent execution.
   *
   * @var string
   */
  private const LOCK_KEY = 'lessons:update-finished:lock';

  /**
   * Lock timeout in seconds (10 minutes).
   *
   * @var int
   */
  private const LOCK_TIMEOUT = 600;

  /**
   * Execute the console command.
   */
  public function handle(V2LessonRepositoryInterface $lessonRepository): int
  {
    $startTime = now();
    $lockKey = self::LOCK_KEY;

    // Prevent concurrent execution using cache lock
    $lock = Cache::lock($lockKey, self::LOCK_TIMEOUT);

    if (!$lock->get()) {
      $this->error('Another instance of this command is already running.');
      Log::warning('UpdateFinishedLessonsCommand: Concurrent execution prevented', [
        'lock_key' => $lockKey,
        'timestamp' => $startTime->toDateTimeString(),
      ]);
      return Command::FAILURE;
    }

    try {
      $this->info('Starting update finished lessons process...');
      Log::info('UpdateFinishedLessonsCommand: Started', [
        'start_time' => $startTime->toDateTimeString(),
        'batch_size' => $this->option('batch-size'),
      ]);

      $batchSize = (int)$this->option('batch-size');
      $result = $lessonRepository->updateFinishedLessons($batchSize);

      $endTime = now();
      $duration = $endTime->diffInSeconds($startTime);

      // Display results
      $this->info("Process completed in {$duration} seconds");
      $this->info("Total lessons found: {$result['total']}");
      $this->info("Lessons updated: {$result['updated']}");
      $this->info("Lessons skipped: {$result['skipped']}");

      if (!empty($result['errors'])) {
        $this->warn("Errors encountered: " . count($result['errors']));
        foreach ($result['errors'] as $error) {
          $this->error("  - {$error}");
        }
      }

      // Log summary
      Log::info('UpdateFinishedLessonsCommand: Completed', [
        'start_time' => $startTime->toDateTimeString(),
        'end_time' => $endTime->toDateTimeString(),
        'duration_seconds' => $duration,
        'total' => $result['total'],
        'updated' => $result['updated'],
        'skipped' => $result['skipped'],
        'errors_count' => count($result['errors']),
      ]);

      if (!empty($result['errors'])) {
        return Command::FAILURE;
      }

      return Command::SUCCESS;
    } catch (\Exception $e) {
      $endTime = now();
      $duration = $endTime->diffInSeconds($startTime);

      $this->error("Command failed: " . $e->getMessage());
      Log::error('UpdateFinishedLessonsCommand: Fatal error', [
        'start_time' => $startTime->toDateTimeString(),
        'end_time' => $endTime->toDateTimeString(),
        'duration_seconds' => $duration,
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
      ]);

      return Command::FAILURE;
    } finally {
      // Always release the lock
      $lock->release();
      Log::info('UpdateFinishedLessonsCommand: Lock released', [
        'lock_key' => $lockKey,
      ]);
    }
  }
}
