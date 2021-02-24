<template>
  <div class="col-md-8 order2">
    <h2>投稿したタグ一覧</h2>
    <div
      v-show="loading"
      class="loader-space">
      <vue-loaders-ball-spin-fade-loader
        color="#DEF2FF"
        class="loader" />
    </div>    
    <div
      v-show="!loading"
      class="mytag">
      <ul>
        <li
          v-for="(name,key) in mytag"
          :key="name">
          <p class="tag">
            {{ key }}
          </p>
          <p class="count">
            ({{ name }}枚)
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userId: String
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    mytag(){
      return this.$store.getters['mytag/mytag']
    }
  },
  mounted() {
    this.$store.dispatch('mytag/getMytag', this.userId)
      .then(()=>this.loading = false)
  },
}
</script>
<style scoped>
    h2{
        margin: 3rem 0.5rem 2rem;
        background: linear-gradient(transparent 70%, #08415C 70%);
    }
    .mytag{
      margin-bottom: 5rem;
    }
    ul{
        padding: 0;
        list-style: none;
    }
    ul > li{
        border: 1px solid #73877B;
        border-radius: 7px;
        display: inline-block;
        padding: 0.5% 1%;
        margin: 0.5% 0.5%;
        cursor: pointer;
    }
    ul > li:hover{
        background-color: #73877B;
        color: #FFF;
    }
    ul > li > p{
        margin: 0;
        display: inline;
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