<template>
  <div class="wrapper">
    <div
      v-show="!loading"
      class="container">
      <div class="pankuzu">
        <h2>{{ tag.tag_name }}の検索結果</h2>
      </div>
      <div class="contents">
        <div
          v-for="data in datas"
          :key="`first-${data.post_id}`"
          class="content-item">
          <router-link :to="{ name: 'individual', params: { postId: data.post_id }}">
            <img
              :src="`../${data.photo_path}`"
              alt="card"
              class="content-img">
            <div class="content-exsept">
              <div class="profile">
                <img
                  :src="`../${data.user.profile.icon_path}`"
                  alt=""
                  class="content-icon">
                <p class="content-id">
                  @{{ data.user.login_id }}
                </p>
              </div>
              <p class="content-description">
                {{ data.description }}
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div
      v-show="loading"
      class="loader-space">
      <vue-loaders-ball-spin-fade-loader
        color="#DEF2FF"
        class="loader" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tagId: String
  },

  computed: {
    tag(){
      return this.$store.getters['tagpage/tag']
    },
    datas(){
      return this.$store.getters['tagpage/data']
    },
    loading(){
      return this.$store.getters['tagpage/loading']
    },
    result(){
      return this.$store.getters['search/result']
    }
  },
  mounted() {
    console.log('tagId:', this.tagId)
    this.$store.dispatch('tagpage/getTag', this.tagId)
  },
  methods: {
    closeSearch(){
      this.$store.commit('search/setResult', false)
    }
  },
  beforeRouteUpdate(to, from, next){
    const name = to.params.tagId
    this.closeSearch()
    this.$store.dispatch('tagpage/getTag', name)
    next()
  }
}
</script>
<style scoped>
.pankuzu{
  padding:2rem;
}
.contents{
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
}
.content-item{
    width: 32%;
    background-color: #fff;
    box-shadow: 2px 2px 4px gray;
    margin-bottom: 20px;
    border-radius: 20px;
}
.content-item:hover{
    opacity: 0.6;
}
.content-img{
    width: 100%;
    border-radius: 20px 20px 0 0;
}
.content-exsept{
    padding:10px;
}
.content-icon{
    width:50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    float: left;
}
.content-id{
    margin-left: 15px;
}
.content-description{
    clear: both;
}
.loader-space{
    width: 100%;
    height: 20vh;
    position: relative;
    margin: 0 47%;
}
.loader{
    position: absolute;
}
</style>