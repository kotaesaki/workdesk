<template>
  <div>
    <div class="container login">
      <h2>ログイン</h2>
      <form @submit.prevent="login">
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
        <div class="login_id">
          <label for="login_id">ログインID</label>
          <input
            id="login_id"
            v-model="loginForm.login_id"
            type="text">
        </div>
        <div class="password">
          <label for="password">パスワード</label>
          <input
            id="password"
            v-model="loginForm.password"
            type="password">
        </div>
        <button type="submit">
          ログイン
        </button>
      </form>
    </div>
    <loading v-show="loading" />
  </div>
</template>
<script>
import Loading from '../common/Loading.vue'
export default {
  name: 'Login',
  components: {Loading},
  data() {
    return {
      loginForm: {
        login_id: '',
        password: ''
      },
    }
  },
  computed: {
    errors() {
      return this.$store.getters['auth/errors']
    },
    loading(){
      return this.$store.getters['auth/loading']
    }
  },
  methods: {
    async login() {
      this.$store.dispatch('auth/login', this.loginForm).then(() => {
      }).catch(error=>{
        console.log(error)
      })
    }
  },
  
}

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
@media(max-width: 767px){
  h2{
    display: inline-block;
    margin: 2rem 0;
  }
  label{
    width: 100%;
    text-align: center;
  }
  input{
    width: 100%;
    font-size: 16px;
    transform: scale(1.0);
  }
  button{
    padding: 1rem 4rem;
    margin: 4rem;
  }
}
</style>
