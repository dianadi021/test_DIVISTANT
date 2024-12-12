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
        Schema::create('user_session_jwt', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user')->unique();
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->string('jwt');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_session_jwt');
    }
};

// dokumentasi https://www.npmjs.com/package/connect-pg-simple
// CREATE TABLE "user_session_express" (
//     "sid" varchar NOT NULL COLLATE "default",
//     "sess" json NOT NULL,
//     "expire" timestamp(6) NOT NULL
//   )
//   WITH (OIDS=FALSE);

//   ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

//   CREATE INDEX "IDX_session_expire" ON "session" ("expire");
