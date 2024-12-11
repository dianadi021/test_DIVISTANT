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
        Schema::create('user_session_express', function (Blueprint $table) {
            $table->string('sid')->primary();
            $table->longText('sess');
            $table->timestamp('expire');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_session_express');
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
