<template>
  <div class="col-md-8 order2">
    <h2>フォローされているユーザー</h2>
    <div
      v-show="loading"
      class="loader-space">
      <vue-loaders-ball-spin-fade-loader
        color="#DEF2FF"
        class="loader" />
    </div>   
    <div
      v-show="!loading"
      class="follows">
      <div
        v-for="follower in followers"
        :key="follower.id"
        class="follow-content">
        <router-link :to="{name: 'mypage', params: {userId: follower.id}}">
          <img
            :src="`../../${follower.profile.icon_path}`"
            alt=""
            class="card-img">
          <div class="follow-body">
            <h5 class="follow-name">
              {{ follower.name }}
            </h5>
            <h6 class="follow-id">
              {{ follower.login_id }}
            </h6>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userId: String,
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    followers(){
      return this.$store.getters['follow/follower']
    }
  },
  mounted() {
    console.log('FollowerContent mounted start!')
    this.$store.dispatch('follow/showFollower', this.userId)
      .then(()=>this.loading = false)
  },
  methods: {
    methodName() {
            
    },
  },
}
</script>
<style scoped>
    h2{
        margin: 3rem 0.5rem 2rem;
        background: linear-gradient(transparent 70%, #08415C 70%);
    } 
    .follows{
      margin-bottom: 5rem;
    }
    .follow-content{
        padding: 2% 1%;
        border-bottom: 1px solid #08415C;
    }
    .follow-content .follow-body{
        padding: 0 0 0 60px;
    }
    .card-img{
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        float: left;
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
@media(max-width: 767px){
  h2{
    display: none;
  }
}
</style>