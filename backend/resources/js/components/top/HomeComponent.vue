<template>
  <div id="wrapper">
    <div class="tab">
      <div class="tab_box container">
        <ul class="tab_list">
          <router-link
            :to="{name: 'home'}">
            <li
              :class="{'active': isActive === '1'}"
              @click="changeTab('1')">
              New
            </li>
          </router-link>
          <router-link
            :to="{name: 'trend'}">
            <li
              :class="{'active': isActive === '2'}"
              @click="changeTab('2')">
              Trend
            </li>
          </router-link>
          <router-link
            :to="{name: 'item'}">
            <li
              :class="{'active': isActive === '3'}"
              @click="changeTab('3')">
              Items
            </li>
          </router-link>
        </ul>
      </div>
    </div>
    <div class="topImage container">
      <div class="box">
        <ul>
          <li><div class="circle" /></li>
        </ul>
        <span>自宅の作業環境の参考に！<br>在宅環境をシェアする写真投稿サービスです。</span>
        <div
          v-if="!isLogin"
          class="guestLogin"
          @click="guestLogin">
          <span>Guest Login</span>
        </div>
        <img
          :src="`./images/top.jpg`"
          alt="トップ"
          class="image-top">
      </div>
    </div>
    <div class="pages">
      <div class="container">
        <div class="row justify-content-center">
          <div class="article">
            <router-view
              name="home"
              class="item" />
            <router-view
              name="trend"
              class="item" />
            <router-view
              name="item"
              class="item" />
          </div>
        </div>
      </div>     
    </div>   
    <div
      v-show="isLogin && successLogin"
      class="modalLogin">
      <p
        v-show="isLogin && successLogin"
        class="modalContent">
        ログインに成功しました。
      </p>
    </div>
    <loading v-show="loading" />
  </div>
</template>
<script>
export default {
  props: {
    successLogin: Boolean
  },
  data() {
    return {
      isActive: '',
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters['auth/check']
    },
    loading(){
      return this.$store.getters['auth/loading']
    }
  },
  watch: {
    $route(to) {
      if (to.name === 'home'){
        this.isActive = '1'
      }
    },
  },
  mounted() {
    const path = this.$route.path
    if (path === '/'){
      this.isActive = '1'
    } else if (path === '/trend'){
      this.isActive = '2'
    } else if (path === '/item'){
      this.isActive ='3'
    }
  },
  methods: {
    changeTab(val) {
      this.isActive = val
    },
    guestLogin(){
      this.$store.dispatch('auth/login', {login_id: 'guest', password: 'w7WPmhuC'})
    }
  },
}
</script>
<style scoped>
.topImage{
    position: relative;
    height: 50vh;
}
.image-top{
    position: absolute;
    width: 41vh;
    height: 100%;
    top: 0%;
    right: 2vw;
    object-fit: cover;
}
.topImage > .box > span{
    position: absolute;
    font-size: 1.5rem;
    text-align: center;
    top: 36%;
    left: 10%;
    color: #111111;
    text-shadow: 1px 1px 69px #3ea8ff;
}
.topImage ul {
    list-style: none;
    padding: 0;
}
.topImage .circle{
    position: absolute;
    width: 40vh;
    height: 40vh;
    border-radius: 50%;
    background-color: #DEF2FF;
    animation: horizontal 40s ease-in-out infinite alternate;
    animation-duration: 6.5s;
    z-index:-1;
}
.topImage li:first-child{

    animation: vertical 30s ease-in-out infinite alternate;
    animation-duration: 10.5s;
}
@keyframes horizontal {
    0% { transform:translateX( -400px); }
    100% { transform:translateX(  -200px); }
}
@keyframes vertical {
    0% { transform:translateY( 0px); }
    100% { transform:translateY(  100px); }
}

.tab{
    width: 100%;
    position: sticky;
    background-color:#fff;
    top:0;
    z-index: 100;
}
.tab_list {
    overflow: hidden;
    list-style: none;
}
.tab_list li {
    float: left;
    padding: 10px 20px;
    cursor: pointer;
    transition: .3s;
}
.tab_list li:not(:first-child) {
    border-left: none;
}
.tab_list .active {
    border-bottom: 3px solid #000;
    cursor: auto;
}
.article{
    overflow: hidden;
    margin-top: -1px;
    width: 100%;
}
.pages{
    height: 100%;
    background-color: #DEF2FF;
    margin-top: 100px;
}
.modalLogin{
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
@keyframes modal {
    to {
        opacity: 0;
        width:0;
        height:0;
        overflow:hidden;
    }
}
.guestLogin{
    position: absolute;
    top: 57%;
    left: 24%;
    border: 1px solid;
    border-radius: 5px;
    padding: 1rem 2rem;
    background: #222;
    color: #fff;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    -moz-transition: 1s;
    -o-transition: 1s;
    -webkit-transition: 1s;
    transition: 1s;
    overflow: hidden;
}
.guestLogin:before{
    content: "";
    position: absolute;
    bottom: -40px;
    right: -40px;
    width: 10px;
    height: 10px;
    background: #222;
    border-radius: 25%;
    -moz-transition: 1s;
    -o-transition: 1s;
    -webkit-transition: 1s;
    transition: 1s;
    bottom: auto;
    top: -40px;
    overflow: hidden;
}
.guestLogin:hover, .guestLogin:focus {
  color:  #000;
}
.guestLogin:hover:before, .guestLogin:focus:before {
  width: 400px;
  height: 400px;
  background-color: #fcde59;
}
.guestLogin span {
  position: relative;
  z-index: 1000;
}
@media(max-width: 1000px){
  .tab{
    margin: -1.1rem 0 0 0;
  }
  .container{
    margin: 0 auto;
  }
  .tab_list{
    padding: 0;
  }
  .topImage > .box > span{
    display: inline-block;
    width: 77%;
    top:10%;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    font-size: 1.2rem;
  }
  .topImage .image-top{
    top: 7rem;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
  }
  .pages{
    margin-top: 17rem;
  }
  .guestLogin{
    top: 32rem;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
  }
}
</style>