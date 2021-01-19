<template>
 <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <p>アカウント設定</p>
        </div>
        <settings-bar></settings-bar>
    </div>
</div>   
</template>
<script>
import settingsBar from './settingsBar.vue';
export default {
  components: { settingsBar },
    props: {
        userId: String //idを取得
    },
    data() {
        return{
            id:{}
       }
   },
   methods: {
       getId() {
           axios.get('/api/mypage/' + this.userId).then((res)=>{
               this.id = res.data;
           })
       }
   }, 
   mounted() {
       this.getId();
   },
    
}
</script>
