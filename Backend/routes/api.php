<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('checkout', [CheckoutController::class, 'checkout']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();

Route::middleware(['admin.api'])->prefix('admin')->group(function(){
    
    Route::post('register',[AdminController::class,'register']);
    Route::get('register',[AdminController::class,'show_register']);
    Route::get('register/{id}',[AdminController::class,'show_register_by_id']);
    Route::put('register/{id}',[AdminController::class,'update_register']);

    Route::post('create-jenis',[AdminController::class,'create_tbm_jenis']);
    Route::post('create-buku',[AdminController::class,'create_tbm_buku']);
    Route::delete('delete-buku/{id}', [AdminController::class, 'delete_book_by_id']);
    Route::put('update-book/{id}', [AdminController::class, 'update_book_by_id']);
    Route::get('show-product', [AdminController::class, 'show_product']);

});

Route::middleware(['user.api'])->prefix('user')->group(function(){
    Route::get('show-product-user', [UserController::class, 'show_product_user']);
    Route::post('checkout/{id}', [UserController::class, 'checkout']);
    Route::get('show-product/{id}', [UserController::class, 'show_product_by_id']);
    Route::post('add-to-cart/{id}', [UserController::class, 'addToCart']);
    Route::get('show-cart', [UserController::class, 'showCart']);
    Route::delete('delete-cart/{id}', [UserController::class, 'deleteCart']);
});

Route::prefix('checkout')->group(function () {
    Route::get('/', [CheckoutController::class, 'index']);
    Route::post('/', [CheckoutController::class, 'store']);
    Route::get('/{id}', [CheckoutController::class, 'show']);
    Route::put('/{id}', [CheckoutController::class, 'update']);
    Route::delete('/{id}', [CheckoutController::class, 'destroy']);
});
