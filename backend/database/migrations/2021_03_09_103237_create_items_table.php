<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->bigIncrements('item_id');
            $table->unsignedBigInteger('post_id');
            $table->text('item_code');
            $table->text('item_image_url');
            $table->text('item_name');
            $table->text('item_price');
            $table->text('item_url');
            $table->float('item_relation_x', 17, 15);
            $table->float('item_relation_y', 17, 15);
            $table->timestamps();

            $table->foreign('post_id')
                ->references('post_id')
                ->on('posts')
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
        Schema::dropIfExists('items');
    }
}
