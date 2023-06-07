<?php

namespace App\Observers;

use App\Models\Jenis;
use App\Models\Log;

class JenisObserver
{
    public function created(Jenis $jenis)
    {
        Log::create([
            'module' => 'tambah jenis',
            'action' => 'tambah jenis ' . $jenis->jenis . ' dengan id ' . $jenis->idm_jenis,
            'useraccess' => $jenis->user_email
        ]);
    }
}

