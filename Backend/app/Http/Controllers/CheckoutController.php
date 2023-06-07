<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\Checkout;
use App\Models\User;
use App\Models\Buku;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,idm_user',
            'book_id' => 'required|exists:tbm_buku,idm_buku',
            'quantity' => 'required|integer|min:1'
        ]);

        // Dapatkan data pengguna dan buku
        $user = User::find($request->user_id);
        $book = Buku::find($request->book_id);

        // Cek ketersediaan stok buku
        if ($book->stok_buku < $request->quantity) {
            return response()->json([
                'message' => 'Stok buku tidak mencukupi'
            ], 400);
        }

        // Generate kode checkout unik
        $randomCode = $this->generateRandomCode();

        // Buat checkout
        $checkout = new Checkout([
            'user_id' => $user->idm_user,
            'book_id' => $book->idm_buku,
            'quantity' => $request->quantity,
            'total_checkout' => $request->quantity * $book->harga_buku,
            'invoice_checkout' => $randomCode,
        ]);
        $user->checkout()->save($checkout);

        // Kurangi stok buku
        $book->stok_buku -= $request->quantity;
        $book->save();

        return response()->json([
            'data' => $checkout,
            'message' => 'Checkout berhasil'
        ], 201);
    }

    private function generateRandomCode()
    {
        $randomCode = rand(100000, 999999);
        return $randomCode;
    }
}


//     public function checkout(Request $request)
//     {
//         $request->validate([
//             'user_id' => 'required|exists:users,idm_user',
//             'book_id' => 'required|exists:tbm_buku,idm_buku',
//             'quantity' => 'required|integer|min:1'
//         ]);

//     // Dapatkan data pengguna dan buku
//         $user = User::find($request->user_id);
//         $book = Buku::find($request->book_id);

//     // Cek ketersediaan stok buku
//         if ($book->stok_buku < $request->quantity) {
//             return response()->json([
//                 'message' => 'Stok buku tidak mencukupi'
//             ], 400);
//         }

//         $randomCode = rand(100000, 999999); // Menghasilkan angka acak antara 100000 dan 999999
//         $existingCode = Checkout::where('invoice_checkout', $randomCode)->exists();

//         while ($existingCode) {
//             $randomCode = rand(100000, 999999);
//             $existingCode = Checkout::where('invoice_checkout', $randomCode)->exists();
//         }

//     // Buat checkout
//         $checkout = Checkout::create([
//             'user_id' => ['idm_user'],
//             'book_id' => $book->idm_buku,
//             'quantity' => $request->quantity,
//             'total_checkout' => $request->quantity * $book->harga_buku,
//             'invoice_checkout' => $randomCode,
//         ]);

//     // Kurangi stok buku
//         $book->stok_buku -= $request->quantity;
//         $book->save();

//         return response()->json([
//             'data' => $checkout,
//             'message' => 'Checkout berhasil'
//         ], 201);
//     }
// }


// {
//     $validatedData = $request->validate([
//         'invoice_checkout' => 'required',
//         'idm_user' => 'required|exists:users,idm_user',
//         'idm_buku' => 'required|exists:tbm_buku,idm_buku',
//         'quantity_checkout' => 'required|integer',
//     ]);

//     $checkout = new Checkout();
//     $checkout->invoice_checkout = $validatedData['invoice_checkout'];
//     $checkout->idm_user = $validatedData['idm_user'];
//     $checkout->idm_buku = $validatedData['idm_buku'];
//     $checkout->quantity_checkout = $validatedData['quantity_checkout'];
//     $checkout->save();

//     $totalHarga = $checkout->hitungTotalHarga();

//     return response()->json([
//         "data" => [
//             'msg' => 'berhasil di tambahkan kedalam keranjang',
//             'total_harga' => $totalHarga
//         ],
//         'checkout' => $checkout,
//         'totalHarga' => $totalHarga
//     ], 201);
// }



// class CheckoutController extends Controller
// {
//     public function checkout(Request $request)
//     {
//         $validatedData = $request->validate([
//             'invoice_checkout' => 'required',
//             'idm_user' => 'required|exists:users,idm_user',
//             'idm_buku' => 'required|exists:tbm_buku,idm_buku',
//             'quantity_checkout' => 'required|integer',
//         ]);

//         $checkout = new Checkout();
//         $checkout->invoice_checkout = $validatedData['invoice_checkout'];
//         $checkout->idm_user = $validatedData['idm_user'];
//         $checkout->idm_buku = $validatedData['idm_buku'];
//         $checkout->quantity_checkout = $validatedData['quantity_checkout'];
//         $checkout->save();

//         $totalHarga = $checkout->hitungTotalHarga();

//         Checkout::create($validatedData);

//         return response()->json([
//             "data" => [
//                 'msg' => 'berhasil di tambahkan kedalam keranjang',
//                 'total_harga' => '{$totalHarga}'
//             ],
//             'checkout' => $checkout, 'totalHarga' => $totalHarga
//         ], 201);
//     }
// }

