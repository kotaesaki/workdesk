<template>
  <div>
    <content-loader
      :width="345"
      :height="300"
      :speed="2">
      <rect
        x="0"
        y="150"
        rx="3"
        ry="3"
        width="345"
        height="120" /> 
      <circle
        cx="172.5"
        cy="80.4"
        r="35" />
    </content-loader>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: { ContentLoader }
}
</script>
