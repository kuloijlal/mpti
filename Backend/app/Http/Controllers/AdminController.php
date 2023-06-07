<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Firebase\JWT\JWT;
use App\Models\Log;
use App\Models\User;
use App\Models\Buku;
use App\Models\Jenis;

class AdminController extends Controller
{
    public function register (Request $request){

        $validator = Validator::make($request->all(),[
            'nama_user'=>'required', // nama harus isi
            'email'=>'required|email|unique:users,email', // email harus diisi,berformat email,dan unik
            'password'=>'required|min:5', //password minimal harus diisi 8 karakters
            'confirmation_password'=>'required|same:password', // konfirmasi password harus diisi,dan sesuai dengan password
            'role'=>'required|in:admin,user'
        ]);

        if ($validator->fails()){
            return messageError($validator->messages()->toArray());
        }
        $user =$validator->validated();

        User::create($user);

        return response()->json([
            "data"=>[
                'msg'=>'berhasil di daftarkan',
                'nama_user'=>$user['nama_user'],
                'email'=>$user['email'],
                'role'=>$user['role']
            ],
           
        ],200);
    }

    public function show_register(){
        
        $users = User::where('role','user')->get();

        return response()->json([
            "data"=>[
                'msg'=>"user registrasi",
                'data' => $users
            ]
            ],200);
    }
    
    public function show_register_by_id($id){
        
        $user = User::find($id);

        return response()->json([
            "data"=>[
                'msg'=>"user id: {$id}",
                'data' => $user
            ]
            ],200);
    }

    public function update_register(Request $request, $id){

        $user = User::find($id);

        if($user){

            $validator = Validator::make($request->all(),[
                'nama_user'=>'required', // nama harus isi
                'email'=>'required|email|unique:users,email', // email harus diisi,berformat email,dan unik
                'password'=>'required|min:5', //password minimal harus diisi 8 karakters
                'confirmation_password'=>'required|same:password', // konfirmasi password harus diisi,dan sesuai dengan password
                'role'=>'required|in:admin,user'
            ]);

            if($validator->fails()){
                return messageError($validator->messages()->toArray());
            }

            $data = $validator->validated();

            User::where('id',$id)->update($data);

            return response()->json([
                'data' => [
                    "msg" => 'user dengan id {$id}, berhasil diupdate',
                    'nama' => $data['nama_user'],
                    'email' => $request->email,
                    'role' => $data['role']
                ]
                ],200);
        }

        return response()->json([
            "data" => [
                'msg' => 'user dengan id {$id}, tidak ditemukan'
            ]
            ],422);

    }

    public function create_tbm_jenis(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'jenis' => 'required',
            'deskripsi_jenis' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 400);
        }

        $jenisData = $validator->validated();

        $jenis = Jenis::create([
            'jenis' => $jenisData['jenis'],
            'deskripsi_jenis' => $jenisData['deskripsi_jenis']
        ]);

        // Lakukan operasi lainnya setelah berhasil membuat data jenis
        // ...

        return response()->json(['success' => 'Data jenis berhasil dibuat'], 200);
    }

    public function get_tbm_jenis()
    {
        $jenis = Jenis::all();

        return response()->json(['data' => $jenis], 200);
    }

    public function create_tbm_buku(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gambar' => 'required|mimes:png,jpg,jpeg|max:2048',
            'judul_buku' => 'required|max:255',
            'id_jenis' => 'required|integer',
            'stok_buku' => 'required',
            'harga_buku' => 'required',
            'sinopsis_buku' => 'required',
            'email' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 400);
        }

        $thumbnail = $request->file('gambar');
        $filename = now()->timestamp . "-" . $request->gambar->getClientOriginalName();
        $thumbnail->move('uploads', $filename);

        $bukuData = $validator->validated();

        Buku::create([
            'gambar' => 'uploads/' .$filename,
            'judul_buku' => $bukuData['judul_buku'],
            'id_jenis' => $bukuData['id_jenis'],
            'stok_buku' => $bukuData['stok_buku'],
            'harga_buku' => $bukuData['harga_buku'],
            'sinopsis_buku' => $bukuData['sinopsis_buku'],
            'email' => $bukuData['email']
        ]);

        return response()->json([
            "data" => [
                "msg" => "Buku berhasil ditambahkan",
                "buku" => $bukuData['judul_buku'],
                'statusCode' => 200
            ]
        ], 200);

    }

    public function delete_book_by_id($id) {
        $book = Buku::find($id);

        if($book !== NULL) {
            Buku::where('idm_buku', $id)->delete();

            return response()->json([
                'msg' => 'buku berhasil di hapus',
                'statusCode' => 200
            ], 200);
        }

        return response()->json([
            'msg' => 'buku tidak ditemukan',
            'statusCode' => 404
        ], 404);
    }

    public function update_book_by_id(Request $request, $id){
        $book = Buku::find($id);

        if($book !== NULL){
            $validator = Validator::make($request->all(), [
                'gambar' => 'required|mimes:png,jpg,jpeg|max:2048',
                'judul_buku' => 'required|max:255',
                'id_jenis' => 'required|integer',
                'stok_buku' => 'required',
                'harga_buku' => 'required',
                'sinopsis_buku' => 'required',
                'email' => 'required'
            ]);
    
            if ($validator->fails()) {
                return response()->json(['error' => $validator->messages()], 400);
            }

            $thumbnail = $request->file('gambar');
            $filename = now()->timestamp . "_" . $thumbnail->getClientOriginalName();
            $thumbnail->move('uploads', $filename);

            $bukuData = $validator->validated();

            Buku::where('idm_buku', $id)->update([
                'gambar' => $filename,
                'judul_buku' => $bukuData['judul_buku'],
                'id_jenis' => $bukuData['id_jenis'],
                'stok_buku' => $bukuData['stok_buku'],
                'harga_buku' => $bukuData['harga_buku'],
                'sinopsis_buku' => $bukuData['sinopsis_buku'],
                'email' => $bukuData['email']
            ]);

            return response()->json([
                "data" => [
                    "msg" => "Buku berhasil diupdate",
                    "buku" => $bukuData['judul_buku'],
                    'statusCode' => 200
                ]
            ], 200);

        }

        return response()->json([
            'msg' => 'Buku tidak ditemukan',
            'statusCode' => 404
        ], 404);
    }

    public function show_product() {
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
}