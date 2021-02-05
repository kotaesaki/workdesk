<template>
    <div class="col-md-8">
        <p>フォローされているユーザー</p>
        <div class="follows">
            <div class="card" v-for="follower in followers" :key="follower">
                <router-link v-bind:to="{name: 'mypage', params: {userId: follower.id}}">
                    <img :src="`../../${follower.profile.icon_path}`" alt="" class="card-img">
                    <div class="card-body">
                        <h5 class="card-title">{{follower.name}}</h5>
                        <h6 class="card-subtitle">{{follower.login_id}}</h6>
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
        this.$store.dispatch('follow/showFollower', this.userId);
    },
}
</script>
<style scoped>
    .card-img{
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 70%;
    }
</style>