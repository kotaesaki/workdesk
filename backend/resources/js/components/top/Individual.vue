<template>
  <div class="wrapper">
    <individual-loader v-show="loading" />
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
          </div>
        </div>
        <div class="col-md-7 main">
          <div class="contents order2">
            <div class="photo-wrapper">
              <img
                :src="`${post.photo_path}`"
                alt="contents-photo"
                class="contents-photo">
              <div
                v-show="items"
                class="item-relation">
                <div
                  v-for="item in items"
                  :key="item.item_id"
                  :style="{ top: item.item_relation_y + '%', left:item.item_relation_x +'%' }"
                  @click="popBalloon(item)">
                  <i class="fas fa-tag" />
                  <div 
                    class="balloon1">
                    <img
                      :src="`${item.item_image_url}`"
                      alt="商品">
                    <p class="hukidashi-name">
                      {{ item.item_name }}
                    </p>
                    <p class="hukidashi-price">
                      ¥{{ item.item_price }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p class="created-time">
              {{ post.created_at | dayjs }}
            </p>
            <span class="contents-description">{{ post.description }}</span>
          </div>
          <individual-comment
            class="comment order3"
            :show-modal="showModal" />
          <div
            class="contents-profile order1">
            <h3>写真を投稿したユーザー</h3>
            <div>
              <router-link :to="{ name:'mypage', params:{userId:postUser.id}}">
                <img
                  :src="`${profile.icon_path}`"
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
                  :src="`${profile.icon_path}`"
                  alt="icon-photo"
                  class="icon-photo">
              </router-link>
              <div class="name-id">
                <p class="pro_name">
                  {{ postUser.name }}
                </p>
                <a
                  v-show="profile.website_url != 'null'"
                  :href="`${profile.website_url}`"
                  target="_blank"><i class="fas fa-link" /></a>
                <a
                  v-show="profile.twitter_url != 'null'"
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
          <div
            v-show="items"
            class="individual-items">
            <h3>Items</h3>
            <ul>
              <li
                v-for="item in items"
                :key="item.item_id">
                <a
                  :href="`${item.item_url}`"
                  target="_blank">
                  <img
                    :src="`${item.item_image_url}`"
                    alt="商品">
                  <p class="item-name">
                    {{ item.item_name }}
                  </p>
                  <p class="item-price">
                    ¥{{ item.item_price }}
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <transition name="component-balloon">
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
    </transition>
    <transition name="component-balloon">
      <div
        v-show="balloonFlug"
        class="overlay"
        @click="leaveBalloon">
        <div class="balloon2">
          <i
            class="fas fa-times batsuBtn"
            @click="leaveBalloon" />
          <img
            :src="`${popItem.item_image_url}`"
            alt="商品">
          <p class="hukidashi-name">
            {{ popItem.item_name }}
          </p>
          <p class="hukidashi-price">
            ¥{{ popItem.item_price }}
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import IndividualLoader from './IndividualLoader.vue'
import MultipostAboidable from '../../mixins/multipost_aboidable'
import IndividualComment from './IndividualComment.vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
export default {
  components: { IndividualComment, IndividualLoader },
  filters: {
    dayjs: function (date){
      return dayjs(date).format('YYYY/MM/DD HH:mm')
    }
  },
  mixins: [MultipostAboidable],
  props: {
    postId: String
  },
  data() {
    return {
      showModal: false,
      balloonFlug: false,
      popItem: '',
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
    },
    items(){
      return this.$store.getters['individual/items']
    }
  },
  created() {
    this.getIndividual()
      .then(()=>this.$store.dispatch('follow/checkFollow', {auth_user: this.authUser.id, post_user: this.postUser.id}))
      .then(()=>this.$store.dispatch('follow/countFollow', this.postUser.id))
    this.$store.dispatch('comment/getComment', this.postId)
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
    },
    popBalloon(item){
      console.log('item_id'+ item)
      this.popItem = item
      this.balloonFlug = true
    },
    leaveBalloon(){
      this.balloonFlug = false
    }
  },
  beforeRouteLeave(to, from, next){
    this.$store.dispatch('individual/cancel')
    this.$store.dispatch('follow/cancel')
    this.$store.commit('individual/setController', new AbortController())
    this.$store.commit('follow/setController', new AbortController())
    next()
  }
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
        background-color: #2983FD;
        color: #fff;
        border-radius: 5%;
        padding:7px;
        cursor: pointer;
    }
    .contents-profile .unfollow:hover{
      opacity: 0.8;
    }
    .contents-profile .follow:hover{
      opacity: 0.8;
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
        position: sticky;
        top: 3%;
        margin-left: 5%;
    }
    .individual-profile{
        box-shadow: 2px 2px 9px lightgrey;
        background-color: #fff;
        border-radius: 10px;
        
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
        z-index:1000;
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
        z-index: 1001;
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
    .individual-items{
        box-shadow: 2px 2px 9px lightgrey;
        background-color: #fff;
        border-radius: 10px;
    }
    .individual-items h3{
        text-align: center;
        padding: 3% 0;
    }
    .individual-items ul{
        list-style: none;
        padding: 0;
    }
    .individual-items li{
        text-align: center;
        margin-bottom: 1rem;
        border-bottom: 2px dotted;
    }
    .individual-items a:hover{
      opacity: 0.7;
      cursor: pointer;
    }
    .individual-items img{
        position: relative;
        width: 80%;
    }
    .individual-items .item-name{
      font-size: 0.7rem;
      padding: 0%;
      margin-bottom: 0.3rem;
    }
    .individual-items .item-price{
      font-size: 1.1rem;
      color: black;
      font-weight: bold;
      padding: 0 2.5rem 0 0;
      margin-bottom: 0.3rem;
      text-align: right;
    }
    .item-relation{
      position:absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .item-relation > div{ 
      position: absolute;
      width: 40px;
      height: 40px;
      background: #08415C;
      border-radius: 50%;
      opacity: 0.8;
      cursor: pointer;
      transition: all 0.2s;
    }
    .item-relation > div:hover{
      transform: scale(1.1,1.1);
    }
    .item-relation > div:hover .balloon1{
      visibility: visible;
    }
    .item-relation > div:hover .balloon1:before{
      visibility: visible;
    }
    .item-relation i{
      position:absolute;
      top: 50%;
      left: 50%;
      color:#FFF;
      transform: translate(-50%,-50%);
      -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
    }
    .balloon1 {
      position: relative;
      visibility: hidden;
      margin: 1.5em 0;
      padding: 7px 10px;
      color: #555;
      font-size: 16px;
      background: #e0edff;
      border-radius: 15px;
      top: -393%;
      right: 266%;
      width: 16rem;
      z-index: 10001;
    }
    .balloon1:before {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -15px;
      border: 15px solid transparent;
      border-top: 15px solid #e0edff;
      z-index: 10001;
    }
    .balloon1 img{
      width: 6rem;
      height: 6rem;
      float: left;
      object-fit: cover;
    }
    .balloon1 .hukidashi-name{
      position: relative;
      font-size: 0.7rem;
      height: 3rem;
      overflow: hidden;
    }
    .balloon1 .hukidashi-price{
      text-align: right;
      position: relative;
      color: black;
      bottom: 0.6rem;
    }
    .balloon2{
      display: none;
    }
    .photo-wrapper{
      position: relative;
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
  .modalLogin{
    width: 92vw;
  }
  .balloon1{
    visibility: hidden;
    display: none;
  }
  .balloon1:before{
    display: none;
    visibility: hidden;
  }
  .individual-tags{
    position:relative;
    top:auto;
  }
  .individual-items{
    position: relative;
    top: auto;
  }
  .balloon2 {
    display: block;
    position: absolute;
    margin: 1.5em 0;
    padding: 7px 10px;
    color: #555;
    font-size: 16px;
    background: #e0edff;
    border-radius: 15px;
    z-index: 10001;
    width: 75%;
    top: 11%;
    left: 50%;
    text-align: center;
    opacity: 0.85;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
  }
  .component-balloon-enter-active,
  .component-balloon-leave-active {
    transition: opacity .2s ease;
  }
  .component-balloon-enter,
  .component-balloon-leave-to {
    opacity: 0;
  }
}
</style>