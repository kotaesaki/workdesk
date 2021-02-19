<template>
  <div class="view">
    <div class="loading-space" />
    <vue-loaders-ball-spin-fade-loader
      color="#DEF2FF"
      scale="2"
      class="loader" />
  </div>
</template>
<script>
import 'vue-loaders/dist/vue-loaders.css'
export default {
    
}
</script>
<style scoped>
    .view{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        padding: 0 47%;
        background:grey;
        opacity: 0.6;
        z-index: 10000;
    }
    .loading-space{
        height: 40%;
    }
</style>