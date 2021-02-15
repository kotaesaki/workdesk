<template>
    <div class="col-md-8">
        <h2>フォローされているユーザー</h2>
        <div class="loader-space" v-show="loading">
            <vue-loaders-line-scale-pulse-out color="#CFCABF" scale="5" class="loader"></vue-loaders-line-scale-pulse-out> 
        </div>
        <div class="follows" v-show="!loading">
            <div class="follow-content" v-for="follower in followers" :key="follower.id">
                <router-link v-bind:to="{name: 'mypage', params: {userId: follower.id}}">
                    <img :src="`../../${follower.profile.icon_path}`" alt="" class="card-img">
                    <div class="follow-body">
                        <h5 class="follow-name">{{follower.name}}</h5>
                        <h6 class="follow-id">{{follower.login_id}}</h6>
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
    },
    data() {
        return {
            loading: true,
        };
    },
    computed: {
        followers(){
            return this.$store.getters["follow/follower"];
        }
    },
    methods: {
        methodName() {
            
        },
    },
    mounted() {
        console.log("FollowerContent mounted start!");
        this.$store.dispatch('follow/showFollower', this.userId)
            .then(()=>this.loading = false)
    },
}
</script>
<style scoped>
    h2{
        margin: 3rem 0.5rem 2rem;
        background: linear-gradient(transparent 70%, #CFCABF 70%);
    } 
    .follow-content{
        padding: 2% 1%;
        border-bottom: 1px solid #CFCABF;
    }
    .follow-content .follow-body{
        padding: 0 0 0 60px;
    }
    .card-img{
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        float: left;
    }
    .loader-space{
        width: 100%;
        height: 100%;
        text-align: center;
    }
    .loader{
        position:fixed;
        top:26%;
    }
</style>