<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbm_checkout', function (Blueprint $table) {
            $table->id('idm_checkout');
            $table->integer('invoice_checkout');
            $table->unsignedBigInteger('idm_user');
            $table->foreign('idm_user')->references('idm_user')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('idm_buku');
            $table->foreign('idm_buku')->references('idm_buku')->on('tbm_buku')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('quantity_checkout');
            $table->integer('total_checkout');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbm_checkout');
    }
};
