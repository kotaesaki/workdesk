<template>
  <div class="wrapper">
    <div class="container">
      <div class="pankuzu">
        タグテスト
      </div>
      <div class="contents">
        <div
          v-for="data in datas"
          :key="`first-${data}`"
          class="box">
          <div
            v-for="hoge in data"
            :key="`second-${hoge.post_id}`">
            <router-link :to="{ name: 'individual', params: { postId: hoge.post_id }}">
              <img
                :src="`../${hoge.photo_path}`"
                alt="card"
                class="content-img">
              <div class="content-exsept">
                <div class="profile">
                  <img
                    :src="`../${hoge.icon_path}`"
                    alt=""
                    class="content-icon">
                  <p class="content-id">
                    @{{ hoge.login_id }}
                  </p>
                </div>
                <p class="content-description">
                  {{ hoge.description }}
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tagId: String
  },
  computed: {
    posts(){
      return this.$store.getters['tagpage/posts']
    },
    users() {
      return this.$store.getters['tagpage/users']
    },
    profiles(){
      return this.$store.getters['tagpage/profiles']
    },
    datas(){
      return this.$store.getters['tagpage/data']
    }
  },
  mounted() {
    console.log('tagId:', this.tagId)
    this.$store.dispatch('tagpage/getTag', this.tagId)
  },
  methods: {

  },
}
</script>
<style scoped>
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
}
.content-img{
    width: 100%;
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
</style>