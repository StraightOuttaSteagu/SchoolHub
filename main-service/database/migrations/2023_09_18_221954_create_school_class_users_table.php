<?php

use App\Models\SchoolClass;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('school_class_users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignIdFor(SchoolClass::class);
            $table->foreignIdFor(User::class);
            $table->enum("role", ["student", "teacher"]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_class_users');
    }
};
