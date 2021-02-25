<template>
  <div>
    <content-loader
      :width="767"
      :height="1800"
      :speed="3"
      class="smLoader">
      <rect
        x="0"
        y="150"
        rx="3"
        ry="3"
        width="750"
        height="300" /> 
      <rect
        x="0"
        y="470"
        rx="3"
        ry="3"
        width="750"
        height="750" />
      <rect
        x="0"
        y="1260"
        rx="3"
        ry="3"
        width="750"
        height="300" /> 
      <rect
        x="0"
        y="1600"
        rx="3"
        ry="3"
        width="750"
        height="200" />
    </content-loader>

    <content-loader
      :width="367"
      :height="400"
      :speed="3"
      class="pcLoader">
      <rect
        x="42.5"
        y="30"
        rx="3"
        ry="3"
        width="180"
        height="180" /> 
      <rect
        x="240"
        y="30"
        rx="3"
        ry="3"
        width="65"
        height="70" />
      <rect
        x="42.5"
        y="220"
        rx="3"
        ry="3"
        width="180"
        height="100" />
    </content-loader>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: { ContentLoader }
}
</script>
<style scoped>
.smLoader{
  display:none;
}
@media(max-width:767px){
  .smLoader{
    display: block;
  }
  .pcLoader{
    display: none;
  }
}
</style>