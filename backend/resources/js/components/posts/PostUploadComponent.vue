<template>
<div class="container postUpload">
    <div class="row justify-content-center">
            <div class="col-md-10">
                <h2>写真を投稿する</h2>
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
                        <div class="contents">
                            <div class="explain">
                                <p class="title">アイテムタグを追加する</p>
                                <p class="required">※必須</p>
                            </div>
                            <div class="items">
                                <input type="text" name="itemTag" id="itemTag">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="contents">
                            <div class="explain">
                                <p class="title">コメントを追加する</p>
                                <p class="required">※必須</p>
                            </div>
                            <div class="items">
                                <textarea class="commentArea" name="description" id="description" cols="30" rows="10"
                                placeholder="コメントを入力する" v-model="description"></textarea>
                            </div>
                        </div>
                    </div>

                    <input type="hidden" name="id" id="id" v-model="userId">
                    <button type="submit" class="submitBtn">写真を投稿する</button>
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
            if (this.tag.length > 0) {
                this.tag.forEach((text, index) => {
                formData.append('tag[' + index + ']', text);
                })
            } else {
                formData.append('tag', []);
            }
            console.log(formData);
            var config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios.post('/api/post_upload/' + this.userId, formData, config).then((res)=>{
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
           if(!this.tag){
                this.errors.push('タグは必須項目です');
           }
           if(!this.description){
                this.errors.push('コメントは必須項目です');
           }
           return this.errors;
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
<style>
.postUpload h2{
    padding: 3rem 4rem;
}
.postUpload .contents{
    margin: 5%;
    display: inline;
}
.postUpload .contents .explain{
    float: left;
    clear: both;
    padding: 1% 7%;
    width: 43%;
}
.postUpload .contents .title{
    font-size:1.4rem;
}
.postUpload .required{
    color: red;
    font-size: 0.7rem;
    padding: 0 4%;
}
.commentArea{
    resize: none;
    border: 1px solid #cde;
    border-radius: 6px;
    width: 53%;
    height: 10vw;
}
.submitBtn{
    border: 2px solid grey;
    border-radius: 6px;
    margin: 0 auto 20%;
    display: block;
    padding: 2% 8%;
    font-size: 1.2rem;
    background-color: #CFCABF;
    color: #fff;
}
.submitBtn:hover{
    opacity: 0.6;
}
.contents .items{
}
</style>