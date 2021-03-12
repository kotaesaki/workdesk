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
      <mypage-bar
        ref="MypageBar"
        :user-id="userId" />
    </div>
  </div>   
</template>
<script>
import MypageBar from './MypageBar.vue'
export default {
  components: { MypageBar },
  props: {
    userId: String //idを取得
  },
  computed: {
    authUser(){
      return this.$store.getters['auth/user']
    },
    CancelToken(){
      return this.$store.getters['mypage/CancelToken']
    },
    source(){
      return this.$store.getters['mypage/source']
    }
  },
  mounted(){
    this.updatePost(this.userId)
    this.updateUser(this.userId)
  },
  methods: {
    async updatePost(userId) {
      this.$store.commit('mypage/clearVar')
      this.$store.dispatch('mypage/startPost', userId)
    },
    async updateUser(userId){
      this.$store.dispatch('mypage/getId', userId)
      this.$store.dispatch('follow/checkFollow', {auth_user: this.authUser.id, post_user: userId})
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (from.params.userId == to.params.userId){
      next()
    } else if (to.name == 'mypage'){
      this.updatePost(to.params.userId)
      this.updateUser(to.params.userId)
      next()
    }
  }

}
</script>
<style scoped>
@media(max-width:767px){
  .row{
    flex-direction: column;
  }
  .order1{
    order: 1;
  }
  .order2{
    order: 2;
  }
}
</style>
