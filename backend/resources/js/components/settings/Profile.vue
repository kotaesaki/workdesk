<template>
 <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <p>プロフィール設定</p>
            <form v-on:submit.prevent="submit" enctype="multipart/form-data">
                <p v-if="errors.length">
                    <b>以下のエラーを確認してください</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <profile-image v-on:catchImage="displayImage" :profile="profile"></profile-image>
                <div class="form-group">
                    <label for="name">ニックネーム</label>
                    <input type="text" name="name" id="name" v-model="id.name">
                </div>   
                <div class="form-group">
                    <label for="website_url">ウェブサイト</label>
                    <input type="text" name="website_url" id="website_url" v-model="profile.website_url">
                </div>  
                <div class="form-group">
                    <label for="twitter_url">Twitter</label>
                    <input type="text" name="twitter_url" id="twitter_url" v-model="profile.twitter_url">
                </div>  
                <div class="form-group">
                    <label for="shokai">紹介文</label>
                    <textarea id="shokai" name="shokai" v-model="profile.shokai"></textarea>
                </div>
                <div class="form-group">
                    <label for="occupation">職業</label>
                    <select name="occupation" v-model="profile.occupation">
                    <option value=""></option>
                    <option value="学生">学生</option>
                    <option value="主婦">主婦</option>
                    <option value="デザイナー">デザイナー</option>
                    <option value="エンジニア">エンジニア</option>
                    <option value="営業">営業</option>
                    <option value="マーケティング">マーケティング</option>
                    <option value="その他">その他</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="sex">性別</label>
                    <select name="sex" v-model="profile.sex">
                    <option value=""></option>
                    <option value="男">男</option>
                    <option value="女">女</option>
                    <option value="その他">その他</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="age">年齢</label>
                    <select name="age" placeholder="Select" v-model="profile.age">
                    <option value=""></option>
                    <option v-for="n in 100" :key="n" :value="n + 1">{{n + 9}}</option>
                    </select>
                </div>

                <input type="hidden" name="id" id="id" v-model="id.id">
                <button type="submit" class="btn btn-primary">変更内容を保存する</button>
             
            </form>
        </div>
        <settings-bar></settings-bar>
    </div>
</div>   
</template>
<script>
import ProfileImage from './ProfileImage.vue';
import settingsBar from './settingsBar.vue';
export default {
  components: { settingsBar, ProfileImage },
    props: {
        userId: String //idを取得
    },
    data() {
        return{
            id:{},
            profile:{},
            errors:[],
            imageData: '',
            file:''
       }
   },
   methods: {
       submit() {
           this.validate();
           let formData = new FormData();
           formData.append('file',this.file);
           formData.append('id',this.id.id);
           formData.append('name',this.id.name);
           formData.append('website_url',this.profile.website_url);
           formData.append('twitter_url',this.profile.twitter_url);
           formData.append('shokai',this.profile.shokai);
           formData.append('occupation',this.profile.occupation);
           formData.append('sex',this.profile.sex);
           formData.append('age',this.profile.age);
           var config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
           console.log(formData);
           axios.post('/api/profile/'+ this.userId, formData,config).then((res)=>{
               alert('保存しました');
           }).catch(err => {
                console.log('err:', err);
                console.log('失敗');
        });
       },
       getId() {
           axios.get('/api/profile/' + this.userId).then((res)=>{
                this.id = res.data[0];
                this.profile = res.data[1];

           })
       },
       validate(){
            this.errors = [];
            if(!this.id.name){
            console.log("ニックネームは必須項目です");
            this.errors.push('ニックネームは必須項目です');
        }
       },
       displayImage(imageData,file){
           this.imageData = imageData;
           this.file = file;
       }

   }, 
   mounted() {
       this.getId();
   },
    
}
</script>
