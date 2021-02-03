<template>
    <div class="view">
        <div class="loading-space"></div>
        <vue-loaders-ball-clip-rotate-multiple color="blue" scale="2"></vue-loaders-ball-clip-rotate-multiple>
    </div>
</template>
<script>
import "vue-loaders/dist/vue-loaders.css";
export default {

    
}
</script>
<style scoped>
    .view{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 47%;
    }
    .loading-space{
        height: 40%;
    }
</style>