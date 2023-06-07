<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Models\Buku;
use App\Observers\BukuObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Buku::observe(BukuObserver::class);
    }
}
