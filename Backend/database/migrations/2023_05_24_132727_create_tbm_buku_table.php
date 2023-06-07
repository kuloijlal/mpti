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
        Schema::create('tbm_buku', function (Blueprint $table) {
            $table->id('idm_buku');
            $table->unsignedBigInteger('id_jenis')->nullable();
            $table->foreign('id_jenis')->references('id')->on('tbm_jenis')->onDelete('cascade')->onUpdate('cascade');
            $table->string('gambar');
            $table->string('judul_buku');
            $table->integer('stok_buku');
            $table->integer('harga_buku');
            $table->string('sinopsis_buku');
            $table->string('email');
            $table->foreign('email')->references('email')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->enum('status_buku', ['publish', 'unpublish'])->default('unpublish');
            $table->timestamps();
        });

        // Tambahkan baris berikut untuk memberikan nilai default pada kolom idm_jenis
        // DB::statement('ALTER TABLE tbm_buku MODIFY idm_jenis BIGINT UNSIGNED DEFAULT 0');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbm_buku');
    }
};
