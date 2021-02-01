<template>
    <div class="col-md-12">
        <p>最新の投稿</p>
        <div class="card-deck">
                <div class="card post-content" v-for="post in posts" :key="post">
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
    },
    mounted() {
        console.log('Mount start');
        this.posts = this.$store.dispatch('newtimeline/getPost');
    },
}
</script>
<style scoped>
    .post-content{
        width: 20vw;
    }
</style>