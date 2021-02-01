<template>
<div class="container">

    <div class="row justify-content-center">
        <follow-content></follow-content>
        <mypage-bar :id="id"></mypage-bar>
    </div>
</div>
</template>
<script>
import MypageBar from '../mypage/MypageBar.vue';
import FollowContent from './FollowContent.vue';
export default {
    components: { MypageBar, FollowContent },
    props: {
        userId: Number //idを取得
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
    },
}
</script>