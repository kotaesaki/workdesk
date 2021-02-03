<template>
    <div class="container">
        <div class="row justify-content-center">
            <router-view name="mypage" :posts="posts" :tagss="tags" :start="start" 
                :end="end" :startScrollYOffset="startScrollYOffset"
                :postData="postData"></router-view>
            <router-view name="follow"></router-view>
            <router-view name="follower"></router-view>
            <router-view name="postTag"></router-view>
            <router-view name="mylikes" :userId="userId"></router-view>
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
            tags :'',
            start:0,
            end:10,
            startScrollYOffset: 0,
            postData:[]
       }
   },
   methods: {
       getId() {
           axios.get('/api/mypage/' + this.userId).then((res)=>{
               this.id = res.data[0];
               this.posts = res.data[1];
               this.tags = res.data[2];
               if(this.end <= this.posts.length){
                    this.postData = this.postData
                        .concat(this.posts.slice(this.start,this.end));
                    this.start = this.start + 10;
                    this.end = this.end + 10;
                }else{
                    this.postData = this.posts;
                }
           })
       },
       
   }, 
   mounted() {
       this.getId();
       this.startScrollYOffset = Math.floor(window.innerHeight / 3);
   },
    
}
</script>
