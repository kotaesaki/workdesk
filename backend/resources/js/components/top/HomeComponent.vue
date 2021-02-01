<template>
    <div id="wrapper">
        <img :src="`./images/top.jpg`" alt="トップ" class="image-top">
        <div class="container">
            <div class="row justify-content-center">
                <new-timeline></new-timeline>
                <trend-timeline></trend-timeline>
                <trend-item></trend-item>
            </div>
        </div>        
    </div>
 
</template>
<script>
import NewTimeline from './NewTimeline.vue'
import TrendItem from './TrendItem.vue'
import TrendTimeline from './TrendTimeline.vue'
export default {
  components: { NewTimeline, TrendTimeline, TrendItem },
    
}
</script>
<style scoped>
    .image-top{
        width:100vw;
        height: 300px;
        object-fit: cover;
    }
</style>