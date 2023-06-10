<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Buku;
use App\Models\Cart;
use App\Models\User;
use App\Models\Checkout;
use Illuminate\Support\Str;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function show_product_jenis() {
        $product = Buku::with('tbm_jenis')->get();

        $data = [];

        foreach($product as $d) {
            $genres = [];
            foreach($d->tbm_jenis as $genre){
                $genres[] = [
                    'jenis' => $genre->jenis,
                ];
            }

            array_push($data, [
                'id_buku' => $d->idm_buku,
                'gambar' => url($d->gambar),
                'judul_buku' => $d->judul_buku,
                'genre' => $genres,
                'stok_buku' => $d->stok_buku,
                'harga_buku' => $d->harga_buku,
                'sinopsis_buku' =>$d->sinopsis_buku
            ]);
        }
        return response()->json([
            "data" => [
                'msg' => 'Daftar Product',
                'data' => $data,
                'statusCode' => 200
            ]
        ], 200);
    }

    public function checkout(Request $request, $id)
    {
        $product = Buku::with('tbm_jenis')->where('idm_buku', $id)->first();
        if($product !== NULL) {
            $validator = Validator::make($request->all(), [
                'quantity_checkout' => 'required|integer'
            ]);

            if($validator->fails()) {
                return messageError($validator->messages()->toArray());
            }

            $checkout = $validator->validated();

            $jwt = $request->bearerToken();
            $decode = JWT::decode($jwt, new Key(env('JWT_SECRET_KEY'), 'HS256'));
            Checkout::create([
                'invoice_checkout' => random_int(100000, 999999),
                'idm_user' => $decode->id,
                'idm_buku' => $product->idm_buku,
                'quantity_checkout' => $checkout['quantity_checkout'],
                'total_checkout' => $product->harga_buku * $checkout['quantity_checkout']
            ]);

            return response()->json([
                'msg' => 'berhasil checkout',
                'statusCode' => 200
            ], 200);
        }

        return response()->json([
            'msg' => 'product tidak ditemukan',
            'statusCode' => 404
        ], 404);
    }

    public function show_product_by_id($id) {
        $product = Buku::with('tbm_jenis')->where('idm_buku', $id)->first();

        if($product !== NULL) {
            $genres = [];
            foreach($product->tbm_jenis as $genre){
                $genres[] = [
                    'jenis' => $genre->jenis,
                ];
            }
            return response()->json([
                "data" => [
                    'msg' => 'Detail Product',
                    'data' => [
                        'id' => $product->idm_buku,
                        'gambar' => url($product->gambar),
                        'judul' => $product->judul_buku,
                        'jenis' => $genres,
                        'stok_buku' => $product->stok_buku,
                        'harga_buku' => $product->harga_buku,
                        'sinopsis_buku' =>$product->sinopsis_buku
                    ],
                    'statusCode' => 200
                ]
            ], 200);
        }
        
        return response()->json([
            "data" => [
                'msg' => 'Not Found'
            ],
            'statusCode' => 404
        ], 404);
    }

    public function addToCart(Request $request, $id) {
        try {
            $user = $request['userauth'];
            $user_id = $user['id'];

            $buku = Buku::find($id);
            if (!$buku) return response()->json([
                "status" => "error",
                "message" => "Buku tidak ditemukan"
            ], 404);

            $cart = Cart::create([
                "user_id" => $user_id,
                "buku_id" => $buku->idm_buku
            ]);

            if ($cart) return response()->json([
                "status" => "success",
                "message" => "Berhasil masuk ke keranjang",
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "false",
                "message" => $e->getMessage()
            ]);
        }
    }

    public function showCart(Request $request) {
        $jwt = $request->bearerToken();
        $decode = JWT::decode($jwt, new Key(env('JWT_SECRET_KEY'), 'HS256'));

        $checkout = Checkout::where('idm_user', $decode->id)->exists();
        $checkoutData = Checkout::where('idm_user', $decode->id)->get();

        if($checkout !== false) {
            $data = $checkoutData->map(function ($item) {
                return [
                    'idm_checkout' => $item->idm_checkout,
                    'invoice_checkout' => $item->invoice_checkout,
                    'idm_user' => $item->idm_user,
                    'idm_buku' => $item->idm_buku,
                    'quantity_checkout' => $item->quantity_checkout,
                    'total_checkout' => $item->total_checkout,
                    'statusCode' => 200
                ];
            });
            return response()->json([
                'msg' => 'Checkout User',
                'data' => $data
    
            ], 200);
        }

        return response()->json([
            'msg' => 'Belum ada barang yang dicheckout',
            'statusCode' => 402
        ], 402);
    }

    public function deleteCart($id) {
        $co = Checkout::find($id);

        if($co !== NULL) {
            Checkout::where('idm_checkout', $id)->delete();

            return response()->json([
                'msg' => 'Checkout berhasil',
                'statusCode' => 200
            ], 200);
        }

        return response()->json([
            'msg' => 'Checkou gagal',
            'statusCode' => 404
        ], 404);
    }

}
