<?php

namespace App\Providers;

use App\Repositories\Interfaces\ConditionRepositoryInterface;
use App\Repositories\Interfaces\LessonRepositoryInterface;
use App\Repositories\Interfaces\V2ConditionRepositoryInterface;
use App\Repositories\Interfaces\V2LessonRepositoryInterface;
use App\Repositories\Interfaces\V2ReviewRepositoryInterface;
use App\Repositories\Interfaces\V2UserRepositoryInterface;
use App\Repositories\ConditionRepository;
use App\Repositories\LessonRepository;
use App\Repositories\V2ConditionRepository;
use App\Repositories\V2LessonRepository;
use App\Repositories\V2ReviewRepository;
use App\Repositories\V2UserRepository;
use App\Services\Interfaces\ConditionServiceInterface;
use App\Services\Interfaces\NotReservedLessonServiceInterface;
use App\Services\Interfaces\ReservedLessonServiceInterface;
use App\Services\Interfaces\V2ConditionServiceInterface;
use App\Services\Interfaces\V2LessonServiceInterface;
use App\Services\Interfaces\V2ReviewServiceInterface;
use App\Services\ConditionService;
use App\Services\NotReservedLessonService;
use App\Services\ReservedLessonService;
use App\Services\V2ConditionService;
use App\Services\V2LessonService;
use App\Services\V2ReviewService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Repositories
        $this->app->bind(LessonRepositoryInterface::class, LessonRepository::class);
        $this->app->bind(ConditionRepositoryInterface::class, ConditionRepository::class);
        $this->app->bind(\App\Repositories\Interfaces\ReviewRepositoryInterface::class, \App\Repositories\ReviewRepository::class);
        $this->app->bind(\App\Repositories\Interfaces\UserRepositoryInterface::class, \App\Repositories\UserRepository::class);

        // V2 Repositories
        $this->app->bind(V2ConditionRepositoryInterface::class, V2ConditionRepository::class);
        $this->app->bind(V2LessonRepositoryInterface::class, V2LessonRepository::class);
        $this->app->bind(V2ReviewRepositoryInterface::class, V2ReviewRepository::class);
        $this->app->bind(V2UserRepositoryInterface::class, V2UserRepository::class);

        // Services
        $this->app->bind(ReservedLessonServiceInterface::class, ReservedLessonService::class);
        $this->app->bind(NotReservedLessonServiceInterface::class, NotReservedLessonService::class);
        $this->app->bind(ConditionServiceInterface::class, ConditionService::class);
        $this->app->bind(\App\Services\Interfaces\ReviewServiceInterface::class, \App\Services\ReviewService::class);
        $this->app->bind(\App\Services\Interfaces\LessonServiceInterface::class, \App\Services\LessonService::class);
        $this->app->bind(\App\Services\Interfaces\UserServiceInterface::class, \App\Services\UserService::class);

        // V2 Services
        $this->app->bind(V2ConditionServiceInterface::class, V2ConditionService::class);
        $this->app->bind(V2LessonServiceInterface::class, V2LessonService::class);
        $this->app->bind(V2ReviewServiceInterface::class, V2ReviewService::class);

        // local かつ クラスが存在する時だけ
        if (
            $this->app->environment('local')
            && class_exists(\Laravel\Pail\PailServiceProvider::class)
        ) {
            $this->app->register(\Laravel\Pail\PailServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
