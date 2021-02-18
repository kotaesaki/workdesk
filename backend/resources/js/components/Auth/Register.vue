<template>
  <div class="container register">
    <h2>新規登録</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">名前</label>
        <input type="text" id="name" v-model="registerForm.name" />
      </div>
      <div>
        <label for="login_id">ログインID</label>
        <input type="text" id="login_id" v-model="registerForm.login_id" />
      </div>
      <div>
        <label for="email">メールアドレス</label>
        <input type="email" id="email" v-model="registerForm.email" />
      </div>
      <div>
        <label for="password">パスワード</label>
        <input type="password" id="password" v-model="registerForm.password" />
      </div>
      <div>
        <label for="password_confirm">パスワード（確認）</label>
        <input type="password" id="password_confirm" v-model="registerForm.password_confirmation" />
      </div>
      <button type="submit">新規登録</button>
    </form>
    <div class="loader-space" v-show="loading">
        <vue-loaders-ball-spin-fade-loader color="#DEF2FF" scale="2" class="loader"></vue-loaders-ball-spin-fade-loader>
    </div>   
  </div>
</template>
<script>
export default {
  name: "register",
  components: {},
  data() {
    return {
      registerForm: {
        name: "",
        login_id: "",
        email: "",
        password: "",
        password_confirmation: "",

        loading: '',
      }
    };
  },
  methods: {
    register(context, data) {
        this.$store.dispatch('auth/register', this.registerForm).then(()=>{
            this.$router.push({ name: "home", params:{successLogin : 'ログイン成功'} });
        })       
    },
  }
};
</script>
<style scoped>
h2{
  display: inline;
  background: linear-gradient(transparent 70%, #DEF2FF 70%);
}
.register{
  text-align: center;
  margin: 5% auto;
}
.register div{
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
  width: 21%;
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
    .loader-space{
        width: 100%;
        text-align: center;
        padding: 7% 0;
        margin: 10% 0 ;
    }
</style>