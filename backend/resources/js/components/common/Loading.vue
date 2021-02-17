<template>
    <div class="view">
        <div class="loading-space"></div>
            <vue-loaders-ball-spin-fade-loader color="#DEF2FF" scale="2" class="loader"></vue-loaders-ball-spin-fade-loader>
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