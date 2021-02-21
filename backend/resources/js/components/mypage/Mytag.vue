<template>
  <div class="col-md-8">
    <h2>投稿したタグ一覧</h2>
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
        background: linear-gradient(transparent 70%, #CFCABF 70%);

    }
    ul{
        padding: 0;
        list-style: none;
    }
    ul > li{
        border: 1px solid #CFCABF;
        border-radius: 7px;
        display: inline-block;
        padding: 0.5% 1%;
        margin: 0.5% 0.5%;
        cursor: pointer;
    }
    ul > li:hover{
        background-color: #CFCABF;
        color: #FFF;
    }
    ul > li > p{
        margin: 0;
        display: inline;
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