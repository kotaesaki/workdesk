<template>
 <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <p>アカウント設定</p>
            <form v-on:submit.prevent="submit">
                <p v-if="errors.length">
                    <b>以下のエラーを確認してください</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{error}}</li>
                    </ul>
                </p>
                <div class="form-group">
                    <label for="e-mail">メールアドレス</label>
                    <input type="text" name="email" id="email" v-model="id.email">
                </div>
                <div class="form-group">
                    <label for="password">パスワード</label>
                    <p>※メールアドレスのみを変更される方は、現在のパスワードを入力してください。</p>
                    <p>※パスワードを変更される方は、こちらに新たなパスワードを入力してください。</p>
                    <input type="password" name="password" id="password" v-model="password"  autocomplete="new-password" v-show-password>
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
       }
   },
   methods: {
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
