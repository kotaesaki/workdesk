<template>
    <div class="col-md-12">
            <p>最新の投稿</p>
            <div class="loader-space" v-show="loading">
                <vue-loaders-ball-beat color="blue" class="loader"></vue-loaders-ball-beat>
            </div>
            <div class="card-deck" v-show="!loading">
                <div class="card post-content" v-for="post in posts" :key="post.post_id">
                    <router-link v-bind:to="{ name: 'individual', params: { postId: post.post_id }}">
                        <img :src="`../${post.photo_path}`" alt="card" class="card-img-top">
                        <div class="card-body">
                            <p class="card-text">{{post.description}}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    
</template>
<script>
export default {
    data() {
        return {
        };
    },
    computed: {
        posts() {
            return this.$store.getters["newtimeline/post"];
        },
        loading(){
            return this.$store.getters["loading/loading"];
        }
    },
    mounted() {
        console.log('newTimeline mounted start');
        this.$store.dispatch('loading/startLoad')
            .then(()=>this.$store.dispatch('newtimeline/getPost'))
            .then(()=>this.$store.dispatch('loading/endLoad'));
    },
}
</script>
<style scoped>
    .post-content{
        width: 20vw;
    }
    .loader-space{
        width: 100%;
        height: 100%;
    }
    .loader{
        margin-left: 47%;
        margin-top:1%;
    }
</style>