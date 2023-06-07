<?php

namespace App\Observers;
use App\Models\Checkout;

class CheckoutObserver
{
    public function created(Checkout $checkout)
    {
        // Logika yang ingin Anda terapkan saat entri Checkout baru dibuat
    }

    public function updated(Checkout $checkout)
    {
        // Logika yang ingin Anda terapkan saat entri Checkout diperbarui
    }

    public function deleted(Checkout $checkout)
    {
        // Logika yang ingin Anda terapkan saat entri Checkout dihapus
    }
    
    // Implementasikan metode lainnya sesuai kebutuhan
}

