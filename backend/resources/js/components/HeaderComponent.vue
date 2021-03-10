<template>
  <div>
    <nav
      id="header-nav"
      class="navbar navbar-expand-md navbar-light">
      <div class="container container-s">
        <router-link :to="{name: 'home'}">
          <img
            :src="`/images/Logo.svg`"
            alt="ロゴ"
            class="logo">
        </router-link>
        <search-component />
        <div v-show="complete">
          <div
            v-if="isLogin==true"
            id="navbarSupportedContent"
            class="coll">
            <ul class="">
              <li class="">
                <a
                  id="navbarDropdown"
                  class="dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <img
                    :src="`${profile.icon_path}`"
                    class="icon_name"> 
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right listChild"
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
          <div
            v-else-if="isLogin==false"
            class="notLogin">
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
      <p
        v-if="isLogin===false && isLogout === true"
        :class="{modalContent: isLogin===false && isLogout === true}" />
    </div>
  </div>
</template>

<script>
import Loading from './common/Loading.vue'
import SearchComponent from './common/Search.vue'
export default {
  components: { Loading, SearchComponent },
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
  watch: {
    profile(newValue, oldValue) {
      return this.$store.getters['auth/profile']
    },
  },
  created() {
    const token = this.$store.getters['auth/token']
    const user = this.$store.getters['auth/user']
    if (token && !user){
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
    .nav-bar{
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem;
    }
    .coll{
        position: relative;
        padding-top: 8px;
    }
    .coll > ul{
      list-style: none;
    }
    .dropdown-toggle::after{
      display: none;
    }
    .logo{
      position:absolute;
      top:2px;
      height: 55px;
    }
    .listChild{
      z-index: 15000;
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
        z-index: 20000;
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
        z-index: 20001;
    }
    .modalContent::before{
        content: 'ログアウトに成功しました。';
        -moz-animation: modal 0s ease-in 2s forwards;
        -webkit-animation: modal 0s ease-in 2s forwards;
        -o-animation: modal 0s ease-in 2s forwards;
        animation: modal 0s ease-in 2s forwards;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
    }
    @keyframes modal {
        to {
            width:0;
            height:0;
            overflow:hidden;
        }
    }
@media(max-width: 1000px){
  .container-s{
    max-width: 100%;
  }
  .coll{
    position: absolute;
    top: 0.7rem;
    right: 0.9rem;
  }
  .navbar{
    padding: 0;
  }
  .logo{
    top: 0.7rem;
    left: 0.5rem;
    height: 44px;

  }
  .notLogin{
    position:absolute;
    top: 21px;
    right: 1.2rem;
  }
}
</style>