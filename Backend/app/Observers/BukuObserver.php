<?php

namespace App\Observers;

use App\Models\Buku;
use App\Models\Log;

class BukuObserver
{
    
    public function created(Buku $buku){
        Log::create([
            'module' => 'tambah buku',
            'action' => 'tambah buku'.$buku->judul_buku.' dengan id '.$buku->idm_buku,
            'useraccess' => $buku->email
        ]);
    }
}
