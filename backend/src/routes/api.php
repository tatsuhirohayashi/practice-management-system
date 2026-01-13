<?php

use App\Http\Controllers\ConditionController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\NotReservedLessonController;
use App\Http\Controllers\ReservedLessonController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\V2ConditionController;
use App\Http\Controllers\V2LessonController;
use App\Http\Controllers\V2ReviewController;
use Illuminate\Support\Facades\Route;

// Test endpoints (no authentication required, no database connection)
Route::get('/test', [TestController::class, 'test']);
Route::get('/test/user', [TestController::class, 'testUser']);
Route::get('/test/lessons', [TestController::class, 'testLessons']);
Route::get('/test/empty', [TestController::class, 'testEmpty']);

// User endpoints
Route::post('/user/login', [UserController::class, 'login']);
Route::get('/coaches/clients', [UserController::class, 'getCoachClients']);
Route::post('/coaches/clients', [UserController::class, 'createCoachClient']);
Route::post('/coaches/register', [UserController::class, 'registerCoach']);

// Client Side
// Client reserved lessons
Route::get('/clients/reserved-lessons', [V2LessonController::class, 'getClientReservedLessons']);
Route::put('/clients/reserved-lessons/{id}/confirmed', [V2LessonController::class, 'confirmClientReservedLesson']);
Route::put('/clients/reserved-lessons/{id}/not-confirmed', [V2LessonController::class, 'unconfirmClientReservedLesson']);
Route::put('/clients/reserved-lessons/{id}/cancel', [V2LessonController::class, 'cancelClientReservedLesson']);
Route::put('/clients/reserved-lessons/{id}/not-cancel', [V2LessonController::class, 'notCancelClientReservedLesson']);

// Client not reserved lessons
Route::get('/clients/not-reserved-lessons', [V2LessonController::class, 'getClientNotReservedLessons']);
Route::post('/clients/not-reserved-lessons', [V2LessonController::class, 'createClientNotReservedLesson']);
Route::put('/clients/not-reserved-lessons/{id}', [V2LessonController::class, 'updateClientNotReservedLesson']);
Route::delete('/clients/not-reserved-lessons/{id}', [V2LessonController::class, 'deleteClientNotReservedLesson']);

// Client Condition endpoints
Route::get('/clients/condition-list', [V2ConditionController::class, 'getClientConditionList']);
Route::post('/clients/condition', [V2ConditionController::class, 'createClientCondition']);
Route::get('/clients/condition/{id}', [V2ConditionController::class, 'getClientConditionDetail']);
Route::put('/clients/condition/{id}', [V2ConditionController::class, 'updateClientCondition']);

// Client Review endpoints
Route::get('/clients/review-list', [V2ReviewController::class, 'getClientReviewList']);
Route::post('/clients/review', [V2ReviewController::class, 'createClientReview']);
Route::get('/clients/review/{id}', [V2ReviewController::class, 'getClientReviewDetail']);
Route::put('/clients/review/{id}', [V2ReviewController::class, 'updateClientReview']);


// Coach Side
// Coach reserved lessons
Route::get('/coaches/reserved-lessons', [V2LessonController::class, 'getCoachReservedLessons']);
Route::put('/coaches/reserved-lessons/{id}/cancel', [V2LessonController::class, 'cancelCoachReservedLesson']);

// Coach not reserved lessons
Route::get('/coaches/not-reserved-lessons', [V2LessonController::class, 'getCoachNotReservedLessons']);
Route::put('/coaches/not-reserved-lessons/{id}/reserve', [V2LessonController::class, 'reserveCoachLesson']);
Route::put('/coaches/reserved-lessons/{id}/not-reserved', [V2LessonController::class, 'unreserveCoachLesson']);

// Coach lesson detail
Route::get('/coaches/lessons/{id}/condition-review', [V2LessonController::class, 'getCoachLessonConditionReview']);
