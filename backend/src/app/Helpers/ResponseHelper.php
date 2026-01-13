<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ResponseHelper
{
    /**
     * Return a success JSON response.
     */
    public static function success(mixed $data = null, string $message = 'Success', int $statusCode = 200): JsonResponse
    {
        $response = [
            'message' => $message,
        ];

        if ($data !== null) {
            $response['data'] = $data;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Return an error JSON response.
     */
    public static function error(string $message, int $statusCode = 500, ?\Exception $exception = null, ?Request $request = null): JsonResponse
    {
        if ($exception !== null && $request !== null) {
            Log::error($message, [
                'exception' => $exception,
                'request' => $request->all(),
                'trace' => $exception->getTraceAsString(),
            ]);
        }

        $response = [
            'message' => $message,
        ];

        if ($exception !== null && config('app.debug')) {
            $response['error'] = $exception->getMessage();
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Return a 404 Not Found JSON response.
     */
    public static function notFound(string $message = 'Resource not found.'): JsonResponse
    {
        return self::error($message, 404);
    }

    /**
     * Return a 422 Validation Error JSON response.
     */
    public static function validationError(array $errors, string $message = 'Validation failed.'): JsonResponse
    {
        return response()->json([
            'message' => $message,
            'errors' => $errors,
        ], 422);
    }

    /**
     * Handle exceptions and return appropriate error response.
     */
    public static function handleException(\Exception $e, Request $request, string $defaultMessage = 'An error occurred.'): JsonResponse
    {
        $statusCode = 500;
        $message = $defaultMessage;

        // Handle specific exception types
        if ($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
            $statusCode = 404;
            $message = 'Resource not found.';
        } elseif ($e instanceof \Illuminate\Validation\ValidationException) {
            return self::validationError($e->errors(), $e->getMessage());
        } elseif ($e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
            $statusCode = 404;
            $message = 'Route not found.';
        }

        return self::error($message, $statusCode, $e, $request);
    }
}

