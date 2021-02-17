<template>
 <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <h2>プロフィール設定</h2>
            <div class="loader-space" v-show="loading">
                <vue-loaders-ball-spin-fade-loader color="#DEF2FF" scale="2" class="loader"></vue-loaders-ball-spin-fade-loader>
            </div>
            <div v-show="!loading">
                <form v-on:submit.prevent="submit" enctype="multipart/form-data">
                    <p v-if="errors.length">
                        <b>以下のエラーを確認してください</b>
                        <ul>
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </p>
                    <profile-image-form v-on:catchImage="displayImage" :profile="profile"></profile-image-form>
                    <div class="form-group">
                        <div class="contents">
                            <div class="explain">
                                <label for="name">ニックネーム</label>
                            </div>
                            <div class="items">
                                <input type="text" name="name" id="name" v-model="id.name">
                            </div>
                        </div>
                    </div>   
                    <div class="form-group">
                        <div class="contents">
                            <div class="explain">
                                <label for="website_url">ウェブサイト</label>
                            </div>
                            <div class="items">
                                <input type="text" name="website_url" id="website_url" v-model="profile.website_url">
                            </div>
                        </div>
                    </div>  
                    <div class="form-group">
                        <div class="contents">
                            <div class="explain">
                                <label for="twitter_url">Twitter</label>
                            </div>
                            <div class="items">
                                <input type="text" name="twitter_url" id="twitter_url" v-model="profile.twitter_url">                            
                            </div>
                        </div>                    
                    </div>  
                    <div class="form-group">
                        <div class="contents">
                            <div class="explain">
                                <label for="shokai">紹介文</label>
                            </div>
                            <div class="items">
                                <textarea id="shokai" name="shokai" v-model="profile.shokai" rows="200"></textarea>
                            </div>
                        </div>                    
                    </div>
                    <div class="form-group">
                        <div class="contents">
                            <div class="explain">
                                <label for="occupation">職業</label>
                            </div>
                            <div class="items">
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
                        </div>                    
                    </div>
                    <div class="form-group">
                        <div class="contents">
                            <div class="explain">
                                <label for="sex">性別</label>
                            </div>
                            <div class="items">
                                <select name="sex" v-model="profile.sex">
                                <option value=""></option>
                                <option value="男性">男性</option>
                                <option value="女性">女性</option>
                                <option value="その他">その他</option>                            
                                </select>
                            </div>
                        </div>                    
                    </div>
                    <div class="form-group">
                        <div class="contents">
                            <div class="explain">
                                <label for="age">年齢</label>
                            </div>
                            <div class="items">
                                <select name="age" placeholder="Select" v-model="profile.age">
                                <option value=""></option>
                                <option v-for="n in 100" :key="n" :value="n + 1">{{n + 9}}</option>                    
                                </select>
                            </div>
                        </div>                    
                    </div>

                    <input type="hidden" name="id" id="id" v-model="id.id">
                    <button type="submit" class="submitBtn">変更内容を保存する</button>
                
                </form>
            </div>
        </div>
        <settings-bar></settings-bar>
    </div>
</div>   
</template>
<script>
import ProfileImageForm from './ProfileImageForm.vue';
import settingsBar from './settingsBar.vue';
export default {
  components: { settingsBar, ProfileImageForm },
    props: {
        userId: String //idを取得
    },
    data() {
        return{
            id:{},
            profile:{},
            errors:[],
            imageData: '',
            file:'',
            loading: true,
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
           formData.append('icon_title', this.profile.icon_title);
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
       async getId() {
           await axios.get('/api/profile/' + this.userId).then((res)=>{
                this.id = res.data[0];
                this.profile = res.data[1];
                if(this.profile.website_url == 'null'){
                    this.profile.website_url = '';
                }
                if(this.profile.twitter_url == 'null'){
                    this.profile.twitter_url = '';
                }
                if(this.profile.sex == 'null'){
                    this.profile.sex = '';
                }
                if(this.profile.age == 'null'){
                    this.profile.age = '';
                }
                if(this.profile.occupation == 'null'){
                    this.profile.occupation = '';
                }
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
       this.getId()
        .then(()=>this.loading = false)
   },
    
}
</script>
<style scoped>
h2{
    margin: 3rem 0.5rem 2rem;
    background: linear-gradient(transparent 70%, #CFCABF 70%);
}
.contents{
    margin: 7% 0 8%;
}
.contents .explain{
    float: left;
    clear: both;
    padding: 1% 7%;
    width: 43%;
}
.contents .explain label{
    font-size: 1.2rem;
}
.contents .items{
    position: relative;
    display: grid;
}
.items input{
    width: 90%;
    border: 1px solid #CFCABF;
    position:relative;
}
.items select{
    width: 90%;
    border: 1px solid #CFCABF;
    position:relative;
}
.items textarea{
    width: 90%;
    height: 20vh;
    border: 1px solid #CFCABF;
    position:relative;
    resize: none;
}
.contents .items p{
    display: inline;
    font-size: 0.4rem;
    margin: 0;
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
.loader-space{
    width: 100%;
    height: 100%;
    text-align: center;
    opacity: 0.6;
}
.loader{
    position:fixed;
    margin: 6% 0;
}
</style>