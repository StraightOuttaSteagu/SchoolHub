<?php

use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('school_classes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignIdFor(Organization::class);
            $table->foreignIdFor(User::class, "creator_id");
            $table->string("name");
            $table->string("identifier");
            $table->string("subject");
            $table->text("description")->nullable();

            $table->string("icon")->default("leaf");
            $table->string("theme")->default("default-theme");
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_classes');
    }
};
