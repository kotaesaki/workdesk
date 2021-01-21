<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->bigIncrements('tag_id')
                ->unsigned()
                ->comment('タグID');
            $table->bigInteger('tag_post_id')
                ->unsigned()
                ->comment('postID');
            $table->string('tag_name')
                ->comment('タグの名前');
            $table->timestamps();

            $table->foreign('tag_post_id')
                ->references('post_id')
                ->on('posts')
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
        Schema::dropIfExists('tags');
    }
}
