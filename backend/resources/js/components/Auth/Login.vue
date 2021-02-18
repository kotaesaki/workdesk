<template>
    <div class="container login">
    <h2>ログイン</h2>
    <form @submit.prevent="login">
      <p v-if="errors.length">
        <b>以下のエラーを確認してください</b>
        <ul>
            <li v-for="error in errors" :key="error">{{error}}</li>
        </ul>
      </p>
      <div class="login_id">
        <label for="login_id">ログインID</label>
        <input  type="text" id="login_id" v-model="loginForm.login_id" />
      </div>
      <div class="password">
        <label for="password">パスワード</label>
        <input type="password" id="password" v-model="loginForm.password" />
      </div>
      <button type="submit">ログイン</button>
    </form>
    </div>
</template>
<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      loginForm: {
        login_id: "",
        password: ""
      },
      errors:[], 

    };
  },
  methods: {
    async login() {
      const validate = await this.validate();
      if(validate){
        this.$store.dispatch("auth/login", this.loginForm).then(() => {
          this.$router.push({ name: "home" , params:{successLogin : true} });
        }).catch(error=>{
          console.log(error)
        })
      }else{

      }
    },
    async validate(){  
      this.errors = [];
      if(!this.loginForm.login_id){
          await this.errors.push('ログインIDが入力されていません。');
      }
      if(!this.loginForm.password){
          await this.errors.push('パスワードが入力されていません。');
      }
      if(this.errors.length == 0){
        return true;
      }else{
        return false;
      }
    }
  }
};

</script>
<style scoped>

h2{
  display: inline;
  background: linear-gradient(transparent 70%, #DEF2FF 70%);
}
.login{
  text-align: center;
  margin: 5% auto;
}
.login div{
  margin: 5% 0;
}
input{
  width: 40%;
  height: 2.6rem;
  border: 1px solid #DEF2FF;

}
input:focus{
  border: 1px solid #000;
}
label{
  width: auto;
  text-align: right;
  font-size: 1.2rem;
}
button{
  border: 1px solid #DEF2FF;
  background-color: #DEF2FF;
  border-radius: 5px;
  padding: 1% 2%;
}
button:hover{
  opacity: 0.6;
}

ul{
  list-style: none;
}
ul > li{
  color: red;
  font-size: 0.8rem;
}
</style>
