<template>
 <div class="container">
    <div class="row justify-content-center">
        <mypage-content :posts="posts" :tagss="tags"></mypage-content>
        <mypage-bar :id="id"></mypage-bar>
    </div>
</div>   
</template>
<script>
import MypageBar from './MypageBar.vue';
import MypageContent from './MypageContent.vue';
export default {
  components: { MypageBar, MypageContent },
    props: {
        userId: String //idを取得
    },
    data() {
        return{
            id:'',
            posts:'',
            tags :''
       }
   },
   methods: {
       getId() {
           axios.get('/api/mypage/' + this.userId).then((res)=>{
               this.id = res.data[0];
               this.posts = res.data[1];
               this.tags = res.data[2];
           })
       }
   }, 
   mounted() {
       this.getId();
   },
    
}
</script>
