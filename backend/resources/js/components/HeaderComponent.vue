<template>
  <div>
    <nav
      id="header-nav"
      class="navbar navbar-expand-md navbar-light">
      <div class="container">
        <router-link :to="{name: 'home'}">
          WorkDesk
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" />
        </button>
        <div v-show="complete">
          <div
            v-if="isLogin==true"
            id="navbarSupportedContent"
            class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a
                  id="navbarDropdown"
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <img
                    :src="`../${profile.icon_path}`"
                    class="icon_name"> 
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown">
                  <router-link
                    class="dropdown-item"
                    :to="{name: 'mypage', params: {userId: user.id }}">
                    マイページ
                  </router-link>
                  <router-link
                    class="dropdown-item"
                    :to="{name: 'post_upload', params: {userId: user.id }}">
                    投稿
                  </router-link>
                  <router-link
                    class="dropdown-item"
                    :to="{name: 'account', params: {userId: user.id}}">
                    設定
                  </router-link>
                  <button
                    class="dropdown-item"
                    @click="logout">
                    ログアウト
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div v-else-if="isLogin==false">
            <router-link :to="{name: 'register'}">
              新規登録
            </router-link>
            <router-link :to="{name: 'login'}">
              ログイン
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <loading v-show="loading" />
    <div :class="{modalLogout: isLogin===false && isLogout === true}">
      <p :class="{modalContent: isLogin===false && isLogout === true}" />
    </div>
  </div>
</template>

<script>
import Loading from './common/Loading.vue'
export default {
  components: { Loading },
  data() {
    return {
      complete: false,
      loading: false,
      isLogout: false,
    }
  },
  computed: {
    isLogin(){
      return this.$store.getters['auth/check']
    },
    user(){
      return this.$store.getters['auth/user']
    },
    profile(){
      return this.$store.getters['auth/profile']
    },
    token(){
      return this.$store.getters['auth/token']
    }
  },
  mounted() {
    const token = this.$store.getters['auth/token']
    const user = this.$store.getters['auth/user']
    const profile = this.$store.getters['auth/profile']
    if (token && !user){
      console.log('fetchUser()メソッドスタート')
      console.log(token)
      this.$store.dispatch('auth/fetchUser')
        .then(()=> this.complete = true)
    } else if (!profile){
      console.log('fetchUser()メソッドスタート')
      this.$store.dispatch('auth/fetchUser')
        .then(()=> this.complete = true)
    } else {
      this.complete = true
    }
  },
  methods: {
    logout() {
      this.loading = true
      this.$store.dispatch('auth/logout', this.$store.getters['auth/user']).then(()=>{
        this.complete = true
        this.loading = false
        this.isLogout = true
        this.$router.push({ name: 'home'})
      })
    },
    getUser(){
      this.$store.dispatch('auth/fetchUser')
    },
  },
}
</script>
<style scoped>
    nav{
        background-color: #fff;
        height: 60px;
        
    }
    .icon_name{
        width: 35px;
        height: 35px;
        object-fit: cover;
        border-radius: 50%;
    }
    .modalLogout{
        position: absolute;
        top: 0;
        width: 100%;
        height: 60px;
        background-color: #F8A017;
        text-align: center;
        padding:13px 0 0 0;
        -moz-animation: modal 0s ease-in 2s forwards;
        -webkit-animation: modal 0s ease-in 2s forwards;
        -o-animation: modal 0s ease-in 2s forwards;
        animation: modal 0s ease-in 2s forwards;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
    }
    .modalContent{
        position: relative;
        color: #FFFFFF;
        font-size: 1.2rem;
        -moz-animation: modal 0s ease-in 2s forwards;
        -webkit-animation: modal 0s ease-in 2s forwards;
        -o-animation: modal 0s ease-in 2s forwards;
        animation: modal 0s ease-in 2s forwards;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
    }
    .modalContent::before{
        content: 'ログアウトに成功しました。';
    }
    @keyframes modal {
        to {
            width:0;
            height:0;
            overflow:hidden;
        }
    }
</style>