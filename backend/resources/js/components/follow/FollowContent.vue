<template>
    <div class="col-md-8">
        <p>フォローしているユーザー</p>
        <div class="follows">
            <div class="card" v-for="follow in follows" :key="follow">
                <router-link v-bind:to="{name: 'mypage', params: {userId: follow.id}}">
                    <img :src="`../../${follow.profile.icon_path}`" alt="" class="card-img">
                    <div class="card-body">
                        <h5 class="card-title">{{follow.name}}</h5>
                        <h6 class="card-subtitle">{{follow.login_id}}</h6>
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
        follows(){
            return this.$store.getters["follow/follow"];
        }
    },
    methods: {
        methodName() {
            
        },
    },
    mounted() {
        console.log("FollowContent mounted start!");
        this.$store.dispatch('follow/showFollow', this.userId);
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