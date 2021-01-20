<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->bigIncrements('profiles_id')
                ->unsigned()
                ->comment('プロフィールID');
            $table->bigInteger('user_id')
                ->unsigned()
                ->comment('usersテーブルのID');
            $table->string('website_url', 300)
                ->comment('ウェブサイトのURL');
            $table->string('twitter_url', 300)
                ->comment('TwitterのURL');
            $table->longText('shokai')
                ->comment('自己紹介文');
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
}
