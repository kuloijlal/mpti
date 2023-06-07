<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Log;
use App\Models\Jenis;
use App\Models\Checkout;

class Buku extends Model
{
    use HasFactory;

    protected $table = 'tbm_buku';
    protected $primaryKey = 'idm_buku';
    protected $fillable = ['id_jenis','gambar','judul_buku','stok_buku','harga_buku','sinopsis_buku','status_buku','email'];

    public function tbm_jenis() {
        return $this->hasMany(Jenis::class, 'id', 'id_jenis');
    }
    
    public function tbm_checkout(){
        return $this->hasMany(Checkout::class, 'idm_buku');
    }
}
