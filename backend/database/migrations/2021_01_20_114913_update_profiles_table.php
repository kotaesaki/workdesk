<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('occupation', 30)->nullable();
            $table->string('sex', 30)->nullable();
            $table->integer('age')->nullable();
            $table->string('icon_title', 300)->nullable();
            $table->string('icon_path', 300)->nullable();
            $table->string('website_url', 300)->nullable()->change();
            $table->string('twitter_url', 300)->nullable()->change();
            $table->longText('shokai')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('profiles', function (Blueprint $table) {
            //
        });
    }
}
