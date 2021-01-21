<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->bigIncrements('post_id')
                ->unsigned()
                ->comment('ID');
            $table->bigInteger('user_id')
                ->unsigned()
                ->comment('ユーザーID');
            $table->longText('description')
                ->comment('コメント');
            $table->string('photo_name')
                ->comment('写真の名前');
            $table->string('photo_path')
                ->comment('写真のパス');
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
        Schema::dropIfExists('posts');
    }
}
