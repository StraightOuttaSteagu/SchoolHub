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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string("title");
            $table->text("content");
            $table->dateTime("deadline")->nullable();
            $table->foreignIdFor(\App\Models\SchoolClass::class);
            $table->foreignIdFor(\App\Models\User::class);

            $table
                ->enum("type", ["announcement", "assignment"])
                ->default("announcement");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
