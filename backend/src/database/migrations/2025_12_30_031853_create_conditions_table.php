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
        Schema::create('conditions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('lesson_id')->constrained('lessons')->onDelete('cascade');
            $table->unsignedTinyInteger('musle_pain'); // 1~5段階
            $table->unsignedTinyInteger('motivation'); // 1~5段階
            $table->unsignedTinyInteger('feeling'); // 1~5段階
            $table->unsignedTinyInteger('tired'); // 1~5段階
            $table->string('condition_memo', 200)->nullable(); // 200文字以内 空あり
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conditions');
    }
};
