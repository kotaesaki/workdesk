<template>
  <div class="col-md-8">
    <h2>いいねしている写真</h2>
    <div
      v-show="loading"
      class="loader-space">
      <vue-loaders-line-scale-pulse-out
        color="#CFCABF"
        scale="5"
        class="loader" /> 
    </div>
    <div
      v-show="!loading"
      class="likes">
      <div
        v-for="likePost in likePosts"
        :key="likePost.post_id"
        class="content">
        <router-link :to="{ name: 'individual', params: { postId: likePost.post_id}}">
          <img
            :src="`../${likePost.post.photo_path}`"
            alt=""
            class="card-img">
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
      likePosts: '',
      loading: true,
    }
  },
  mounted() {
    console.log('MypageLikes mounted start!')
    this.getMylikes(this.userId)
      .then(()=>this.loading= false)
  },
  methods: {
    async getMylikes(data){
      await axios.get('/api/mylikes', {
        params: {
          user_id: data
        }
      }).then(result=>{
        console.log(result.data)
        this.likePosts = result.data.mylikes.favorite
      }).catch(error=>{
        console.log(error)  
      })
    }
  },

}
</script>
<style scoped>
    h2{
        margin: 3rem 0.5rem 2rem;
        background: linear-gradient(transparent 70%, #CFCABF 70%);
    } 
    .likes{
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
    }
    .content{
        width: 22%;
        margin: 1% 1%;
        cursor: pointer;
    }
    .content:hover{
        opacity: 0.5;
    }
    .card-img{
        
    }
    .loader-space{
        width: 100%;
        height: 100%;
        text-align: center;
    }
    .loader{
        position:fixed;
        top:26%;
    }
</style>