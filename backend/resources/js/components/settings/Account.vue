<template>
 <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <h2>アカウント設定</h2>
            <form v-on:submit.prevent="submit">
                <p v-if="errors.length">
                    <b>以下のエラーを確認してください</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{error}}</li>
                    </ul>
                </p>
                <div>
                    <div class="form-group">
                        <div class="contents">
                            <div class="explain">
                                <label for="e-mail">メールアドレス</label>
                            </div>
                            <div class="items">
                                <input type="text" name="email" id="email" v-model="id.email">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="contents">
                            <div class="explain">
                                <label for="password">パスワード</label>
                            </div>
                            <div class="items">
                                <input :type="inputType" name="password" id="password" v-model="password" autocomplete="new-password">
                                <span :class="iconType" @click="changePassword"></span>
                                <p>※メールアドレスのみを変更される方は、現在のパスワードを入力してください。</p>
                                <p>※パスワードを変更される方は、こちらに新たなパスワードを入力してください。</p>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="hidden" name="id" id="id" v-model="id.id">
                <button type="submit" class="submitBtn">変更内容を保存する</button>
            </form>
        </div>
        <settings-bar></settings-bar>
    </div>
</div>   
</template>
<script>
import settingsBar from './settingsBar.vue';
export default {
  components: { settingsBar },
    props: {
        userId: String //idを取得
    },
    data() {
        return{
            id:{},
            errors:[], //バリデーションエラー文
            password : '',
            isChecked: false,
       }
   },
   computed: {
       inputType() {
           return this.isChecked ? "text" : "password"
       },
       iconType(){
           return this.isChecked ? "eye-slash" : "eye"
       }
   },
   methods: {
       changePassword(){
           this.isChecked = !this.isChecked;
       },
       getId() {
           axios.get('/api/account/' + this.userId).then((res)=>{
               this.id = res.data;
           })
       },
       submit(){
           this.validate();
           let formData = new FormData();
           formData.append('id',this.id.id);
           formData.append('email', this.id.email);
           formData.append('password',this.password);

           axios.post('/api/account/' + this.userId, formData).then((res)=>{
               alert('変更を保存しました');
           }).catch(err => {
               console.log('err:', err);
               console.log('アカウント設定変更失敗');
           })
       },
       validate(){  
           this.errors = [];
           if(!this.id.email){
               this.errors.push('メールアドレスが入力されていません。');
           }
           if(!this.password){
               this.errors.push('パスワードが入力されていません。');
           }
       }
   }, 
   mounted() {
       this.getId();
   },
    
}
</script>
<style scoped>
h2{
    margin: 3rem 0.5rem 2rem;
    background: linear-gradient(transparent 70%, #CFCABF 70%);
}
.contents{
    margin: 7% 0 14%;
}
.contents .explain{
    float: left;
    clear: both;
    padding: 1% 7%;
    width: 43%;
}
.contents .explain label{
    font-size: 1.4rem;
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
.eye::after{
    font-family: 'FontAwesome';
    content: "\f06e";
    position: absolute;
    top: 0.1rem;
    right: 3rem;  
}
.eye-slash::after{
    font-family: 'FontAwesome';
    content: "\f070";
    position: absolute;
    top: 0.1rem;
    right: 3rem;
}
</style>
