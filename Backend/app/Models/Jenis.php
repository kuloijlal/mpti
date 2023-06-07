<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jenis extends Model
{
    use HasFactory;

    protected $table = 'tbm_jenis';
    protected $primaryKey = 'id';
    protected $fillable = ['jenis', 'deskripsi_jenis'];

    public function tbm_buku() {
        return $this->belongsTo(Buku::class, 'id_jenis', 'id');
    }
}