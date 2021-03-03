<template>
  <div class="col-md-4 order1">
    <profile-loader v-show="loading" />
    <div class="page">
      <div
        v-show="!loading"
        class="mypage-profile">
        <img
          class="userInfo__icon"
          :src="`${profile.icon_path}`"> 
        <p class="name">
          {{ id.name }}
        </p>
        <p class="id">
          @{{ id.login_id }}
        </p>
        <div
          v-show="id.id != authUser.id"
          class="link">
          <div class="ff">
            <div
              v-show="!followStatus"
              class="follow"
              @click="pushFollow">
              <i class="fas fa-user-plus" />
            </div>
            <div
              v-show="followStatus"
              class="unfollow"
              @click="deleteFollow">
              <i class="fas fa-user-check" />
            </div>
          </div>
        </div>

        <div class="attribute">
          <p v-show="profile.sex">
            {{ profile.sex }}
          </p>
          <p v-show="profile.occupation">
            {{ profile.occupation }}
          </p>
          <p v-show="profile.age">
            {{ profile.age }}歳
          </p>
        </div>
        <div class="shokai">
          <div>
            <span>
              {{ profile.shokai }}
            </span>
          </div>
        </div>
        <a
          v-show="profile.website_url"
          :href="`${profile.website_url}`"
          target="_blank"><i class="fas fa-link" /></a>
        <a
          v-show="profile.twitter_url"
          :href="`${profile.twitter_url}`"
          target="_blank"><i class="fab fa-twitter" /></a>
      </div>
      <div class="tab">
        <ul id="mypage-item">
          <router-link :to="{name: 'mypage'}">
            <li class="pcList">
              すべての写真
            </li>
            <li
              class="smList"
              :class="{'active': isActive === '1'}"
              @click="changeTab('1')"> 
              ポスト
            </li>
          </router-link>
          <router-link :to="{name: 'follow'}">
            <li class="pcList">
              フォロー
            </li>
            <li
              class="smList"
              :class="{'active': isActive === '2'}"
              @click="changeTab('2')">
              フォロー
            </li>
          </router-link>
          <router-link :to="{name: 'follower'}">
            <li class="pcList">
              フォロワー
            </li>
            <li
              class="smList"
              :class="{'active': isActive === '3'}"
              @click="changeTab('3')">
              フォロワー
            </li>
          </router-link>
          <router-link :to="{name: 'mytag'}">
            <li class="pcList">
              投稿したタグ
            </li>
            <li
              class="smList"
              :class="{'active': isActive === '4'}"
              @click="changeTab('4')">
              タグ
            </li>
          </router-link>
          <router-link :to="{name: 'mylikes'}">
            <li
              class="pcList"
              style="border-bottom: 1px solid #CFCABF;">
              いいねした写真
            </li>
            <li
              class="smList"
              :class="{'active': isActive === '5'}"
              @click="changeTab('5')">
              いいね
            </li>
          </router-link>
        </ul>
      </div>
    </div>    
  </div>
</template>
<script>
import MultipostAboidable from '../../mixins/multipost_aboidable'
import ProfileLoader from './ProfileLoader.vue'
export default {
  components: { ProfileLoader },
  mixins: [MultipostAboidable],
  props: {
    userId: String,
  },
  data() {
    return {
      isActive: '',
    }
  },
  computed: {
    authUser(){
      return this.$store.getters['auth/user']
    },
    followStatus(){
      return this.$store.getters['follow/status']
    },
    id(){
      return this.$store.getters['mypage/id'] 
    },
    profile(){
      return this.$store.getters['mypage/profile']
    },
    posts(){
      return this.$store.getters['mypage/posts']
    },
    loading(){
      return this.$store.getters['mypage/profileLoading']
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == 'mypage'){
        this.isActive = '1'
      }
    },
  },
  created() {
    this.$store.dispatch('mypage/getId', this.userId)
      .then(()=>this.$store.dispatch('follow/checkFollow', {auth_user: this.authUser.id, post_user: this.id.id}))
    this.checkPath()
  },
  methods: {
    async pushFollow(){
      this.avoidMultipost(async()=>{
        this.$store.dispatch('follow/pushFollow', {auth_user: this.authUser.id, post_user: this.id.id})
      })
    },
    async deleteFollow(){
      this.avoidMultipost(async()=>{
        this.$store.dispatch('follow/deleteFollow', {auth_user: this.authUser.id, post_user: this.id.id})
      })
    },
    changeTab(val){
      this.isActive = val
    },
    checkPath(){
      const path = this.$route.name
      if (path === 'mypage'){
        this.isActive = '1'
      } else if (path === 'follow'){
        this.isActive = '2'
      } else if (path === 'follower'){
        this.isActive = '3'
      } else if (path === 'mytag'){
        this.isActive = '4'
      } else if (path === 'mylikes'){
        this.isActive = '5'
      }
    }
  },
}
</script>
<style  scoped>
    .mypage-profile{
        text-align: center;
        padding: 12% 0;
    }
    .mypage-profile p{
        margin-bottom: 0;
    }
    .mypage-profile .name{
        padding-top: 5%;
        font-size: 1.5rem;
    }
    .mypage-profile .id{
      color: grey;
    }
    .userInfo__icon{
        width: 65px;
        height: 65px;
        object-fit: cover;
        border-radius: 50%;
    }
    .loader-space{
        width: 100%;
        height: 20vh;
        position: relative;
    }
    .loader{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
    }
    .mypage-profile .link{
        clear: both;
        padding: 5% 0 7%;
    }
    .mypage-profile .ff{
        text-align: center;
    }
    .mypage-profile .unfollow{
        display: inline-block;
        width: 45%;
        padding: 1% 4%;
        border: 1px solid #2983FD;
        border-radius: 6px;
        font-size: 1.3rem;
        cursor: pointer;
        background-color: #2983FD;
        color: #fff;
        text-align: center;
    }
    .mypage-profile .follow{
        display: inline-block;
        width: 45%;
        padding:1% 4%;
        border: 1px solid #2983FD;
        border-radius: 6px;
        font-size: 1.3rem;
        cursor: pointer;
        text-align: center;

    }
    .mypage-profile .unfollow:hover{
        background-color: blue;
        color: #fff;
    }
    .attribute p{
        display: inline;
    }
    ul{
        list-style: none;
    }
    ul a li{
        padding:1rem 1rem;
        border-top: 1px solid #08415C;
        color: #443311;
    }
    .smList{
      display: none;
    }
    ul li:hover{
        background-color: #08415C;
        color: #fff;
    }
    ul > a:hover {
        color: #fff;
    }
    .shokai{
        text-align: center;
    }
@media(max-width: 767px){
  .page i{
    font-size: 1.5rem;
    color: grey;
  }
  .mypage-profile{
    padding:12% 0 1rem;
  }
  .tab{
    position: sticky;
    top:0;
    width: 100%;
    z-index: 200;
  }
  ul{
    padding:0;
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;
  }
  ul a li{
    padding:1rem 0.4rem 0.2rem;
    float: left;
    border-top: none;
  }
  ul a .active{
    border-bottom: 3px solid #08415C;
    cursor: auto;
  }
  ul li:hover{
    font-size: bold;
    color: #08415C;
    background-color: #fff;
  }
  .pcList{
    display: none;
  }
  .smList{
    display: flex;
  }
}
</style>
