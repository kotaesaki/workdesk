<template>
  <div class="wrapper">
    <loading v-show="loading" />
    <div
      v-show="!loading"
      class="container pages">
      <div class="row justify-content-center">
        <div class="col-md-1">
          <div class="menu">
            <div class="curcle">
              <i
                v-show="status == false && !heartLoading"
                class="far fa-heart favorite"
                :disabled="isPosting"
                @click="pushFavorite" />
              <i
                v-show="status == true && !heartLoading"
                class="fas fa-heart favorite2"
                :disabled="isPosting"
                @click="deleteFavorite" />
              <div
                v-show="heartLoading"
                class="heartLoaderSpace">
                <vue-loaders-ball-spin-fade-loader
                  color="#F66868"
                  class="heartLoader" />
              </div>
            </div>
            <p>{{ countFav }}</p><br>
            <i class="fab fa-twitter twitter" />
          </div>
        </div>
        <div class="col-md-7 main">
          <div class="contents order2">
            <img
              :src="`../${post.photo_path}`"
              alt="contents-photo"
              class="contents-photo">
            <p class="created-time">
              {{ post.created_at | moment }}
            </p>
            <span class="contents-description">{{ post.description }}</span>
          </div>
          <individual-comment
            class="comment order3"
            :show-modal="showModal" />
          <div
            class="
            contents-profile order1">
            <h3>写真を投稿したユーザー</h3>
            <div>
              <router-link :to="{ name:'mypage', params:{userId:postUser.id}}">
                <img
                  :src="`../${profile.icon_path}`"
                  alt="contents-photo"
                  class="icon-photo">
                <div class="name-id">
                  <p class="pro_name">
                    {{ postUser.name }}
                  </p>
                  @{{ postUser.login_id }}
                </div>
              </router-link>
              <div
                v-show="postUser.id != authUser.id"
                class="follow-unfollow">
                <div
                  v-show="!followStatus"
                  class="follow"
                  @click="pushFollow">
                  <i class="fas fa-user-plus" />
                  フォローする
                </div>
                <div
                  v-show="followStatus"
                  class="unfollow"
                  @click="deleteFollow">
                  <i class="fas fa-user-plus" />
                  フォロー解除                        
                </div>
              </div>
            </div>
            <div class="follower">
              <p>{{ countFollow }}フォロー</p>
              <p>{{ countFollower }}フォロワー</p>
            </div>
            <hr>
            <span>{{ profile.shokai }}</span>
          </div>
        </div>
        <div class="col-md-3 sub">
          <div class="individual-profile">
            <div>
              <router-link :to="{ name:'mypage', params:{userId:postUser.id}}">
                <img
                  :src="`../${profile.icon_path}`"
                  alt="icon-photo"
                  class="icon-photo">
              </router-link>
              <div class="name-id">
                <p class="pro_name">
                  {{ postUser.name }}
                </p>
                <a
                  v-show="profile.website_url"
                  :href="`${profile.website_url}`"
                  target="_blank"><i class="fas fa-link" /></a>
                <a
                  v-show="profile.twitter_url"
                  :href="`${profile.twitter_url}`"
                  target="_blank"><i class="fab fa-twitter" /></a>
              </div>
            </div>
            <div class="link">
              <div
                v-show="postUser.id != authUser.id"
                class="ff">
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
          </div>
          <div class="individual-tags">
            <h3>Tags</h3>
            <ul>
              <li
                v-for="tag in tags"
                :key="tag.tag_id"
                class="tag">
                <router-link
                  :to="{ name:'tag', params:{tagId: tag.tag_id}}">
                  {{ tag.tag_name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="showModal"
      class="overlay"
      @click="closeModal">
      <div class="modalLogin">
        <div class="batsu">
          <i
            class="fas fa-times batsuBtn"
            @click="closeModal" />
        </div>
        <img
          :src="`/images/Logo.svg`"
          height="64"
          alt="ロゴだよ"
          class="logo">
        <p>Takuwakuは在宅環境共有プラットフォームです。シェアしてみましょう。</p>
        <div class="modalBtn">
          <button
            class="registerBtn"
            @click="showRegister">
            新規登録
          </button>
          <button
            class="loginBtn"
            @click="showLogin">
            ログイン
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '../common/Loading.vue'
import MultipostAboidable from '../../mixins/multipost_aboidable'
import IndividualComment from './IndividualComment.vue'
import axios from 'axios'
import moment from 'moment'
export default {
  components: { Loading, IndividualComment },
  filters: {
    moment: function (date){
      return moment(date).format('YYYY/MM/DD HH:mm')
    }
  },
  mixins: [MultipostAboidable],
  props: {
    postId: String
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    post(){
      return this.$store.getters['individual/post']
    },
    postUser(){
      return this.$store.getters['individual/user']
    },
    profile(){
      return this.$store.getters['individual/profile']
    },
    tags(){
      return this.$store.getters['individual/tags']
    },
    status(){
      return this.$store.getters['individual/status']
    },
    countFav(){
      return this.$store.getters['individual/countFav']
    },
    authUser(){
      return this.$store.getters['auth/user']
    },
    loading(){
      return this.$store.getters['individual/loading']
    },
    heartLoading(){
      return this.$store.getters['individual/heartLoading']
    },
    followStatus(){
      return this.$store.getters['follow/status']
    },
    countFollow(){
      return this.$store.getters['follow/countFollow']
    },
    countFollower(){
      return this.$store.getters['follow/countFollower']
    },
    source(){
      return this.$store.getters['individual/source']
    }
  },
  mounted() {
    console.log('Individual mounted start!')
    this.getIndividual()
      .then(()=>this.$store.dispatch('follow/checkFollow', {auth_user: this.authUser.id, post_user: this.postUser.id}))
      .then(()=>this.$store.dispatch('follow/countFollow', this.postUser.id))
    this.$store.dispatch('comment/getComment', this.postId)
  },
  beforeRouteLeave(to, from, next){
    console.log('beforeRouteLeave: キャンセル〜〜〜')
    this.source.cancel()
    next()
  },
  methods: {
    async pushFavorite(){
      if (!this.authUser){
        this.showModal = true
      } else {
        this.avoidMultipost(async()=>{
          await this.$store.dispatch('individual/pushFavorite', {post_id: this.post.post_id, user_id: this.authUser.id}) 
        }) 
      }
    },
    async deleteFavorite(){
      this.avoidMultipost(async()=>{
        await this.$store.dispatch('individual/deleteFavorite', {post_id: this.post.post_id, user_id: this.authUser.id})
      })
    },
    async pushFollow(){
      if (!this.authUser){
        this.showModal = true
      } else {
        this.avoidMultipost(async()=>{
          this.$store.dispatch('follow/pushFollow', {auth_user: this.authUser.id, post_user: this.postUser.id})
        })
      }
    },
    async deleteFollow(){
      this.avoidMultipost(async()=>{
        this.$store.dispatch('follow/deleteFollow', {auth_user: this.authUser.id, post_user: this.postUser.id})
      })
    },
    async getUser(){
      const user = this.$store.getters['auth/user']
      if (!user){
        await this.$store.dispatch('auth/fetchUser')
      }
    },
    async getIndividual(){
      await this.$store.dispatch('individual/getIndividual', {post_id: this.postId, user_id: this.authUser.id})
    },
    closeModal(){
      this.showModal = false
    },
    showRegister(){
      this.$router.push({name: 'register'})
    },
    showLogin(){
      this.$router.push({name: 'login'})
    }
  },
}
</script>
<style  scoped>
    .wrapper{
        background-color: #EDF2F7;
    }
    .pages{
        padding-top: 150px;
    }
    .comment{
        box-shadow: 2px 2px 9px lightgrey;
        background-color: #FFF;
        border-radius: 10px;
        margin-top: 5%;
    }
    .contents-profile{
        box-shadow: 2px 2px 9px lightgrey;
        background-color: #FFF;
        border-radius: 10px;
        margin: 6% auto;
        padding: 5%;
    }
    .contents-profile h3 {
        font-size: 1.3rem;
    }
    .contents-profile .name-id{
        float: left;
    }
    .contents-profile .pro_name{
        padding: 2% 0 0;
        margin-bottom: 0;
    }
    .contents-profile .follow-unfollow{
        text-align: right;
    }
    .contents-profile .follow{
        display: inline-block;
        border: 1px solid #CFCABF;
        border-radius: 5%;
        padding:7px;
        cursor: pointer;
    }
    .contents-profile .unfollow{
        display: inline-block;
        border: 1px solid #CFCABF;
        border-radius: 5%;
        padding:7px;
        cursor: pointer;
    }
    .contents-profile .unfollow:hover{
        background-color: #2983FD;
        color: #FFF;
    }
    .contents-profile .follow:hover{
        background-color: #2983FD;
        color: #FFF;
    }
    .contents-profile .follower{
        clear: both;
    }
    .follower p {
        display: inline;
        font-size: 0.8rem;
        color: #859099;
    }
    .contents-profile hr{
        border-width: 1px 0 0 0;
        border-style: solid;
        border-color: #CFCABF;
    }
    .created-time{
        font-size: 0.9em;
        color: #859099;
    }
    .contents-description{
        padding: 3%;
    }
    .sub{
        margin-left: 5%;
    }
    .individual-profile{
        box-shadow: 2px 2px 9px lightgrey;
        background-color: #fff;
        border-radius: 10px;
        position: sticky;
        top: 3%;
    }
    .individual-profile img{
        margin: 5%;
    }
    .individual-profile .pro_name{
        margin-bottom: 0;
        padding: 5% 0 0;
    }
    .individual-profile a{
        font-size:1.2rem;
    }
    .individual-profile .link{
        clear: both;
        padding-bottom: 7%;
    }
    .individual-profile .ff{
        text-align: center;
    }
    .individual-profile .unfollow{
        display: inline-block;
        width: 90%;
        padding: 3% 4%;
        border: 1px solid #2983FD;
        border-radius: 6px;
        font-size: 1.3rem;
        cursor: pointer;
        background-color: #2983FD;
        color: #fff;
        text-align: center;
    }
    .individual-profile .follow{
        display: inline-block;
        width: 90%;
        padding: 3% 4%;
        border: 1px solid #2983FD;
        border-radius: 6px;
        font-size: 1.3rem;
        cursor: pointer;
        text-align: center;

    }
    .individual-profile .unfollow:hover{
        background-color: blue;
        color: #fff;
    }
    .individual-tags{
        box-shadow: 2px 2px 9px lightgrey;
        background-color: #fff;
        border-radius: 10px;
        margin: 13% 0;
        position: sticky;
        top: 22%;
    }
    .individual-tags h3{
        text-align: center;
        padding: 3% 0;
    }
    .individual-tags ul{
        padding: 5%;
    }
    .individual-tags li{    
        list-style: none;
        border: 1px solid #08415C;
        border-radius: 7px;
        display: inline-block;
        padding: 1% 2%;
        margin: 2% 3% 3% 3%;
        cursor: pointer;
    }
    .individual-tags li:hover{
        background-color: #08415C;
    }
    .icon-photo{
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        float: left;
        margin: 1% 2% 0 0;
    }
    .contents-photo{
        box-shadow: 2px 2px 10px darkgrey;
        width: 100%;
    }
    .menu{
        text-align: center;
        position: fixed;
    }
    .curcle{
        position: relative;
        border: 1px solid #fff;
        background-color: #fff;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        padding:24%;
        box-shadow: 2px 2px 5px lightgrey;
    }
    .menu p{
        display: inline;
        margin: 0;
    }
    .menu .twitter{
        font-size: 1.7rem;
        color: grey;
        cursor: pointer;
    }
    .menu .twitter:hover{
        color: #000;
    }
    .favorite{
        font-size: 1.2rem;
        vertical-align: middle;
        cursor: pointer;
    }
    .favorite2{
        font-size: 1.2rem;
        color: #F66685;
        vertical-align: middle;
        cursor: pointer;
    }
    .favorite:hover{
        color: red;
    }
    .favorite2:hover{
        color: red;
    }
    .heartLoader{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.4);
        -webkit-transform: translate(-50%, -50%) scale(0.4);
        -ms-transform: translate(-50%, -50%) scale(0.4);
    }
    .overlay{
        z-index:1;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .modalLogin{
        position:relative;
        z-index: 2;
        width: 30%;
        padding: 1em;
        background-color: #fff;
        text-align: center;
        border-radius: 7px;
        box-shadow: 2px 2px 6px lightgrey;
    }
    .batsu{
        font-size:2em;
        cursor: pointer;
        position: absolute;
        top: -1.3rem;
        right: -0.8rem;
        border-radius: 50%;
        border: 1px solid #fff;
        padding: 0.5rem;
        background-color: #fff;
        width: 2.4rem;
        height: 2.4rem;
        box-shadow: 0 2px 7px grey;
    }
    .batsuBtn{
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 0.6rem;
        right: 0.65rem;
        font-size: 1.3rem;
    }
    .modalLogin p{
        margin: 7% 0;
    }
    .modalBtn{
        margin: 5% 0;
    }
    .registerBtn{
        border: 1px solid blue;
        border-radius: 5px;
        background: #DEF2FF;
        padding: 3% 7%;
        margin: 0 2%;
    }
    .loginBtn{
        border: 1px solid blue;
        border-radius: 5px;
        background: #DEF2FF;
        padding: 3% 7%;
        margin: 0 2%;
    }
    .registerBtn:hover{
        opacity: 0.6;
    }
    .loginBtn:hover{
        opacity: 0.6;
    }
    .modalLogin .logo{
        height: 90px;
        margin: 5% 0 0;
    }
    .loader-space{
        width: 100%;
        height: 20vh;
        top: 0;
        left: 0;
        position: absolute;
    }
    .loader{
        position: absolute;
        top: -0.6rem;
        left: -0.6rem;
    }
@media(max-width:767px){
  .row{
    flex-direction: column;
  }
  .pages{
    padding-top: 3rem;
  }
  .col-md-7{
    display: flex;
    flex-direction: column;
  }
  .col-md-3{
    display: flex;
    flex-direction: column;
  }
  .order1{
    order: 1;
  }
  .order2{
    order: 2;
  }
  .order3{
    order: 3;
  }
  .contents-profile{
    margin: 0 0 2% 0;
  }
  .individual-profile{
    display: none;
  }
  .sub{
    margin-left: 0;
  }
  .menu{
    display: flex;
    z-index: 100;
    bottom: 0;
    right: 0;
  }
  .curcle{
    position: absolute;
    bottom: 4rem;
    right: 2rem;
    width: 5rem;
    height: 5rem;
  }
  .favorite{
    font-size: 2.6rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  .favorite2{
    font-size: 2.6rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  .heartLoader{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.7);
    -webkit-transform: translate(-50%, -50%) scale(0.7);
    -ms-transform: translate(-50%, -50%) scale(0.7);
  }
  .menu p{
    position: absolute;
    bottom: 4rem;
    right: 4.2rem;
  }
  .menu .twitter{
    position: absolute;
    bottom: 9.7rem;
    right: 3.1rem;
    font-size: 2.5rem;
  }

}
</style>