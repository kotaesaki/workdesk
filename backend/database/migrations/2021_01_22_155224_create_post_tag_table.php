<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostTagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('post_tag', function (Blueprint $table) {
            $table->bigInteger('post_id')
                ->unsigned()
                ->comment('投稿ID');
            $table->bigInteger('tag_id')
                ->unsigned()
                ->comment('タグID');
            $table->primary(['post_id','tag_id']);

            $table->foreign('post_id')
                ->references('post_id')
                ->on('posts')
                ->cascadeOnDelete();
            $table->foreign('tag_id')
                ->references('tag_id')
                ->on('tags')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_tag');
    }
}
