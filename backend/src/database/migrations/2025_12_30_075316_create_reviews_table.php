<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('lesson_id')->constrained('lessons')->onDelete('cascade');
            $table->unsignedTinyInteger('forehand'); // 1~5段階
            $table->unsignedTinyInteger('backhand'); // 1~5段階
            $table->unsignedTinyInteger('serve'); // 1~5段階
            $table->unsignedTinyInteger('volley'); // 1~5段階
            $table->unsignedTinyInteger('return'); // 1~5段階
            $table->unsignedTinyInteger('serve_in'); // 0~100パーセント
            $table->unsignedTinyInteger('return_in'); // 0~100パーセント
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
