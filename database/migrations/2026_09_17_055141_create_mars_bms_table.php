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
        Schema::create('mars_bms', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('audio_path')->nullable();
            $table->string('cover_path')->nullable();
            $table->longText('lyrics')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mars_bms');
    }
};
