<template>
  <div class="container">
    <div class="row justify-content-center">
      <router-view
        name="mypage"
        :user-id="userId" />
      <router-view
        name="follow"
        :user-id="userId" />
      <router-view
        name="follower"
        :user-id="userId" />
      <router-view
        name="mytag"
        :user-id="userId" />
      <router-view
        name="mylikes"
        :user-id="userId" />
      <mypage-bar :user-id="userId" />
    </div>
  </div>   
</template>
<script>
import MypageBar from './MypageBar.vue'
import MypageContent from './MypageContent.vue'
export default {
  components: { MypageBar, MypageContent },
  props: {
    userId: String //idを取得
  },
  computed: {
    authUser(){
      return this.$store.getters['auth/user']
    }
  },
  methods: {
    async updatePost(userId) {
      this.$store.commit('mypage/clearVar')
      this.$store.dispatch('mypage/startPost', userId)
    },
    async updateUser(userId){
      this.$store.dispatch('mypage/getId', userId)
        .then(()=>this.$store.dispatch('follow/checkFollow', {auth_user: this.authUser.id, post_user: userId}))
    }
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to)
    if (to.name == 'mypage'){
      this.updatePost(to.params.userId)
      this.updateUser(to.params.userId)
    }
    next()
  },

}
</script>
