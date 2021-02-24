<template>
  <div class="view">
    <div class="loading-space" />
    <vue-loaders-ball-scale
      color="#DEF2FF"
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
        background:grey;
        opacity: 0.6;
        z-index: 10000;
    }
    .loading-space{
        position: relative;
        width: 100vw;
        height: 100vh;
    }
    .loader{
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
    }
</style>