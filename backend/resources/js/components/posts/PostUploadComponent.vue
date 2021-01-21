<template>
<div class="container">
    <div class="row justify-content-center">
            <div class="col-md-10">
                <p>投稿する</p>
            <form v-on:submit.prevent="submit">
                <p v-if="errors.length">
                    <b>以下のエラーを確認してください</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <post-image-form></post-image-form>
                <div class="form-group">
                    <label for="tag">タグを追加する</label>
                    <input type="text" name="tag" id="id">
                </div>
                <div class="form-group">
                    <label for="item_tag">アイテムタグを追加する</label>
                </div>
                <div class="form-group">
                    <label for="description">コメントを追加する</label>
                    <textarea name="description" id="description" cols="30" rows="10" placeholder="コメントを入力する"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">写真を投稿する</button>
            </form>
        </div>
    </div>

</div>
</template>
<script>
import PostImageForm from './PostImageForm.vue';
export default {
  components: { PostImageForm },
    props: {
        userId: String
    },
    data() {
        return {
            errors: [],
        };
    },
    methods: {
        submit() {

        },
        getId() {
           axios.get('/api/profile/' + this.userId).then((res)=>{
                this.id = res.data[0];
                this.profile = res.data[1];

           })
       },
    },
}
</script>
<style scoped>

</style>