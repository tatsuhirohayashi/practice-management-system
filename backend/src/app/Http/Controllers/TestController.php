<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class TestController extends Controller
{
  /**
   * Test endpoint that returns mock data without database connection.
   */
  public function test(): JsonResponse
  {
    return response()->json([
      'status' => 'success',
      'message' => 'API is working correctly',
      'data' => [
        'timestamp' => now()->toDateTimeString(),
        'environment' => config('app.env'),
      ],
    ], 200);
  }

  /**
   * Test endpoint that returns mock user data.
   */
  public function testUser(): JsonResponse
  {
    return response()->json([
      'id' => 1,
      'email' => 'test@example.com',
      'role' => 'client',
    ], 200);
  }

  /**
   * Test endpoint that returns mock lessons data.
   */
  public function testLessons(): JsonResponse
  {
    return response()->json([
      'data' => [
        [
          'id' => 1,
          'lesson_day' => '2024-01-15 10:00:00',
          'lesson_location' => 'テニスコートA',
          'is_reserved' => true,
          'is_confirmed' => false,
          'is_canceled' => false,
        ],
        [
          'id' => 2,
          'lesson_day' => '2024-01-16 14:00:00',
          'lesson_location' => 'テニスコートB',
          'is_reserved' => false,
          'is_confirmed' => false,
          'is_canceled' => false,
        ],
      ],
    ], 200);
  }

  /**
   * Test endpoint that returns empty array.
   */
  public function testEmpty(): JsonResponse
  {
    return response()->json([
      'data' => [],
    ], 200);
  }
}
