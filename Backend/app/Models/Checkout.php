<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Buku;
use App\Models\User;

class Checkout extends Model
{
    use HasFactory;


    protected $table = 'tbm_checkout';
    protected $primaryKey = 'idm_checkout';
    protected $fillable = ['invoice_checkout', 'idm_user', 'idm_buku', 'quantity_checkout', 'total_checkout'];

    public function user()
    {
        return $this->belongsTo(User::class, 'idm_user', 'idm_user');
    }

    public function tbm_buku()
    {
        return $this->belongsTo(Buku::class, 'idm_buku');
    }
}
