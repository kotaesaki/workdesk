<template>
<div class="container">
    <div class="row justify-content-center">
            <div class="col-md-10">
                <p>投稿する</p>
            <form v-on:submit.prevent="submit" enctype="multipart/form-data">
                <p v-if="errors.length">
                    <b>以下のエラーを確認してください</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <post-image-form v-on:catchBlob="uploadBlob"></post-image-form>
                <post-tag-form v-on:catchTag="uploadTag"></post-tag-form>
                <div class="form-group">
                    <label for="item_tag">アイテムタグを追加する</label>
                </div>
                <div class="form-group">
                    <label for="description">コメントを追加する</label>
                    <textarea name="description" id="description" cols="30" rows="10" 
                    placeholder="コメントを入力する" v-model="description"></textarea>
                </div>
                <input type="hidden" name="id" id="id" v-model="userId">
                <button type="submit" class="btn btn-primary">写真を投稿する</button>
            </form>
        </div>
    </div>

</div>
</template>
<script>
import PostImageForm from './PostImageForm.vue';
import PostTagForm from './PostTagForm.vue';
export default {
  components: { PostImageForm, PostTagForm },
    props: {
        userId: String
    },
    data() {
        return {
            id:'',
            profile:'',
            errors: [],
            blob: '',
            tag:'',
            description:'',

        };
    },
    methods: {
        submit() {
            this.validate();
            let imageName = Math.random().toString(32).substring(2);
            let formData = new FormData();
            formData.append('file',this.blob, imageName + '.jpg');
            formData.append('description', this.description);
            formData.append('id', this.userId);
            if(this.tag.length > 0){
                this.tag.forEach((text, index)=>{
                    formData.append('tag[]',text);
                })
            }else{
                formData,append('tag', []);
            }
            console.log(formData);
            var config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.post('/api/post_upload/' + this.userId, formData,config).then((res)=>{
               alert('保存しました');

            }).catch(err=>{
                console.log('err:',err);
                console.log('失敗');
            });
        },
        getId() {
           axios.get('/api/post_upload/' + this.userId).then((res)=>{
                this.id = res.data[0];
                this.profile = res.data[1];

           })
       },
       validate(){
           this.errors = [];
           if(!this.blob){
                this.errors.push('画像は必須項目です');
           }
       },
       uploadBlob(blob){
           this.blob = blob;
       },
       uploadTag(tag){
           this.tag = tag;
       }
    },
}
</script>
<style scoped>

</style>