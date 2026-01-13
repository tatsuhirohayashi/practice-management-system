<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule the update finished lessons command at 11:00, 13:00, 15:00, 17:00, 19:00, 21:00
Schedule::command('lessons:update-finished')->dailyAt('11:00');
Schedule::command('lessons:update-finished')->dailyAt('13:00');
Schedule::command('lessons:update-finished')->dailyAt('15:00');
Schedule::command('lessons:update-finished')->dailyAt('17:00');
Schedule::command('lessons:update-finished')->dailyAt('19:00');
Schedule::command('lessons:update-finished')->dailyAt('21:00');
