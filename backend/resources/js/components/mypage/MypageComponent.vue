<template>
    <div class="container">
        <loading v-show="loading"></loading>
        <div class="row justify-content-center" v-show="!loading">
            <router-view name="mypage" :posts="posts" :tagss="tags" :start="start" 
                :end="end" :startScrollYOffset="startScrollYOffset"
                :postData="postData"></router-view>
            <router-view name="follow" :userId="userId"></router-view>
            <router-view name="follower" :userId="userId"></router-view>
            <router-view name="mytag" :userId="userId"></router-view>
            <router-view name="mylikes" :userId="userId" :posts="posts"></router-view>
            <mypage-bar :id="id"></mypage-bar>
        </div>
    </div>   
</template>
<script>
import Loading from '../common/Loading.vue';
import MypageBar from './MypageBar.vue';
import MypageContent from './MypageContent.vue';
export default {
    components: { MypageBar, MypageContent,Loading },
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
   computed: {
       authUser(){
           return this.$store.getters['auth/user'];
       },
        loading(){
            return this.$store.getters["loading/loading"];
        },
   },
   methods: {
        async getId() {
            await axios.get('/api/mypage/' + this.userId).then((res)=>{
                this.id = res.data[0];
                if(!res.data[1] && !res.data[2]){
                    this.posts = null;
                    this.tags = null;
                    return;
                }else if(!res.data[2] && res.data[1]){
                    this.posts = res.data[1];
                    this.tags = null;
                    return;
                }else if(res.data[2] && !res.data[1]){
                    this.posts = null;
                    this.tags = res.data[2];
                    return;
                }else{
                    this.posts = res.data[1];
                    this.tags = res.data[2];
                }
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
        console.log('created start!');
        this.$store.dispatch('loading/startLoad')
            .then(()=>this.getId())
            .then(()=>this.$store.dispatch('follow/checkFollow', {auth_user: this.authUser.id, post_user:this.id[0].id}))
            .then(()=>this.$store.dispatch('loading/endLoad'))
        this.startScrollYOffset = Math.floor(window.innerHeight / 3);
    },
    beforeUpdate() {
        console.log('beforeUpdate start!');
        if(this.userId != this.id[0].id){
            this.$store.dispatch('loading/startLoad')
                .then(()=>this.getId())
                .then(()=>this.$store.dispatch('follow/checkFollow', {auth_user: this.authUser.id, post_user:this.id[0].id}))
                .then(()=>this.$store.dispatch('loading/endLoad'))
            this.startScrollYOffset = Math.floor(window.innerHeight / 3);
        }

        
    },

    
}
</script>
