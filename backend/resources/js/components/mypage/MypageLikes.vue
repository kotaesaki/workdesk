<template>
    <div class="col-md-8">
        <p>いいねしている写真</p>
        <div class="card-deck">
            <div class="card" v-for="likePost in likePosts" :key="likePost.post_id">
                <router-link v-bind:to="{ name: 'individual', params: { postId: likePost.post_id}}">
                    <img :src="`../${likePost.post.photo_path}`" alt="" class="card-img">
                    <div class="card-body">
                        <h5 class="card-title">{{likePost.post.description}}</h5>
                        <h6 class="card-subtitle"></h6>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        userId: String,
        posts: Array,
    },
    data() {
        return {
            likePosts: '',
        };
    },
    methods:{
        getMylikes(data){
            axios.get('/api/mylikes', {
                params:{
                    user_id: data
                }
            }).then(result=>{
                console.log(result.data);
                this.likePosts = result.data.mylikes.favorite;
            }).catch(error=>{
                console.log(error);  
            })
        }
    },
    mounted() {
        console.log("MypageLikes mounted start!");
        this.getMylikes(this.userId);
    },

}
</script>