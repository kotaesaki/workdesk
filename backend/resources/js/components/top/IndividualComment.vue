<template>
  <div class="comments">
    <div class="comment-content">
      <ul>
        <li
          v-for="comments in commentList"
          :key="comments.comment_id">
          <img
            :src="`../../../../${comments.user[0].profile.icon_path}`"
            alt=""
            class="icon_comment">
          <router-link :to="{ name:'mypage', params:{userId:comments.user_id}}">
            <p class="login_id">
              @{{ comments.user[0].login_id }}
            </p>
          </router-link>
          <p class="time">
            {{ comments.created_at | moment }}
          </p>
          <div class="balloon">
            <div class="says">
              <p
                class="message"
                v-html="$sanitize(comments.comment_message)" />
            </div>
            <i
              class="fas fa-reply reply"
              @click="reply(comments.user[0].login_id,comments.user_id)" />
          </div>
        </li>
      </ul>
    </div>
    <form @submit.prevent="submit">
      <div class="area">
        <textarea
          id="comment"
          v-model="comment"
          name="comment"
          class="textarea"
          cols="30"
          rows="3"
          placeholder="コメントを入力する" />
      </div>
      <button class="comment-btn">
        <p v-show="!loading">
          コメントする
        </p>
        <div
          v-show="loading"
          class="loader-space">
          <vue-loaders-ball-spin-fade-loader
            color="#EDF2F7"
            class="loader"
            scale="0.4" />
        </div>
      </button>
    </form>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  filters: {
    moment: function (date){
      return moment(date).format('YYYY/MM/DD HH:mm')
    }
  },
  props: {  
    showModal: Boolean,
  },
  computed: {
    comment: {
      get(){
        return this.$store.getters['comment/comment']
      },
      set(value){
        this.$store.commit('comment/updateComment', value)
      }
    },
    commentList(){
      return this.$store.getters['comment/commentList']
    },
    post(){
      return this.$store.getters['individual/post']
    },
    user(){
      return this.$store.getters['auth/user']
    },
    loading(){
      return this.$store.getters['comment/loading']
    },
    replyId(){
      return this.$store.getters['comment/replyId']
    }
  },
  methods: {
    submit() {
      if (!this.user){
        this.$parent.showModal = true
      } else {
        this.$store.dispatch('comment/pushComment',
          {comment: this.comment, post_id: this.post.post_id, user_id: this.user.id})
      }
    },
    reply(login_id, user_id){
      this.$store.commit('comment/setReplyId', '@'+login_id)
      this.$store.commit('comment/addReplyComment', `<router-link :to="{ name:'mypage', params:{userId:${user_id}}}">${this.replyId}<router-link>`)
    }

  },
}
</script>
<style scoped>
    .icon_comment{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        float: left;
    }
    ul{
        list-style: none;
    }
    li{
        padding-top:25px;
    }
    a:hover .login_id{
        text-decoration: none;
    }
    .login_id{
        margin: 3px;
        color: #E1544F;
    }
    .time{
        font-size: .8em;
        color: #859099;
    }
    .balloon{
        width: 100%;
        text-align: left;
    }
    .says{
        box-shadow: 2px 2px 2px lightgrey;
        width: 80%;
        display: inline-block;
        position: relative; 
        margin: 0 0 0 50px;
        padding: 10px;
        max-width: 80%;
        border-radius: 12px;
        background: #edf1ee;
    }
    .says:after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 3px; 
        left: -19px;
        border: 8px solid transparent;
        border-right: 18px solid #edf1ee;
        -webkit-transform: rotate(40deg);
        transform: rotate(40deg);
    }
    .message{
        margin-bottom: 0.5em;
        clear: both;
    }
    .reply{
        color: #2983FD;
        position: relative;
        top: 26px;
        right: 20px;
        font-size: 1.6em;
        cursor:pointer;
    }
    form{
        display: block;
        margin: 0 auto;
        width: 90%;
        padding: 10% 0 10%;
    }
    .textarea{
        width: 100%;
        border-radius: 10px;
        border: 1.5px solid #CFCABF;
        resize: none;
    }
    .comment-btn{
        display: block;
        margin: 2% 0 0 auto;
        border: 1.5px solid #CFCABF;
        border-radius: 2%;
        width: 13rem;
        height: 3rem;
        background-color: #fff;
        position: relative;
    }
    .comment-btn:hover{
        background-color: #CFCABF;
    }
    .comment-btn p{
      margin: 0;
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
        left: 4.4rem;
    }

</style>