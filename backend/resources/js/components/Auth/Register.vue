<template>
  <div class="container register">
    <h2>新規登録</h2>
    <form @submit.prevent="register">
      <p
        v-if="errors.length"
        class="error">
        <ul>
          <li
            v-for="error in errors"
            :key="error">
            {{ error }}
          </li>
        </ul>
      </p>
      <div>
        <label for="name">ニックネーム</label>
        <input
          id="name"
          v-model="registerForm.name"
          type="text">
      </div>
      <div>
        <label for="login_id">ログインID</label>
        <input
          id="login_id"
          v-model="registerForm.login_id"
          type="text">
      </div>
      <div>
        <label for="email">メールアドレス</label>
        <input
          id="email"
          v-model="registerForm.email"
          type="email">
      </div>
      <div>
        <label for="password">パスワード</label>
        <input
          id="password"
          v-model="registerForm.password"
          type="password">
      </div>
      <div>
        <label for="password_confirm">パスワード（確認）</label>
        <input
          id="password_confirm"
          v-model="registerForm.password_confirmation"
          type="password">
      </div>
      <button type="submit">
        新規登録
      </button>
    </form>
    <div
      v-show="loading"
      class="loader-space">
      <vue-loaders-ball-spin-fade-loader
        color="#DEF2FF"
        scale="2"
        class="loader" />
    </div>   
  </div>
</template>
<script>
export default {
  name: 'Register',
  components: {},
  data() {
    return {
      registerForm: {
        name: '',
        login_id: '',
        email: '',
        password: '',
        password_confirmation: '',
        loading: false,
      }
    }
  },
  computed: {
    errors() {
      return this.$store.getters['auth/errors']
    },
  },
  methods: {
    register() {
      this.$store.dispatch('auth/register', this.registerForm).then(()=>{
      })       
    },
  }
}
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
.error{
  color: red;
  font-size:0.8rem;
}
.error ul{
  list-style: none;
}
</style>