<template>
    <div class="new-article">
            <h2 class="title">New Post</h2>
            <div class="loader-space" v-show="loading">
                <vue-loaders-ball-beat color="#FFF" class="loader"></vue-loaders-ball-beat>
            </div>
            <div class="contents" v-show="!loading">
                <div class="content-item" v-for="post in posts" :key="post.post_id">
                    <router-link v-bind:to="{ name: 'individual', params: { postId: post.post_id }}">
                        <img :src="`../${post.photo_path}`" alt="card" class="content-img">
                        <div class="">
                            <div class="profile">
                                <img :src="`../${post.user.profile.icon_path}`" alt="" class="content-icon">
                                <p class="content-id">@{{post.user.login_id}}</p>
                            </div>
                            <p class="content-description">{{post.description}}</p>
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
        },
    },
    methods: {
        async getPost() {
            const post = this.$store.getters["newtimeline/post"];
            if(!post){
                await this.$store.dispatch('newtimeline/getPost');
            }
        },
    },
    mounted() {
        console.log('newTimeline mounted start');
        this.$store.dispatch('loading/startLoad')
            .then(()=>this.getPost())
            .then(()=>this.$store.dispatch('loading/endLoad'));
    },
}
</script>
<style scoped>
    .new-article{
        margin-top: 30px;
        position: relative;
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
    }
    h2{

    }

    .contents{
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .content-item{
        width: 32%;
        background-color: #fff;
        box-shadow: 2px 2px 4px gray;
        margin-bottom: 20px;
    }
    .content-img{
        width: 100%;
    }
    .content-icon{
        width:70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
        float: left;
    }
    .content-id{
        margin-left: 15px;
    }
    .content-description{
        clear: both;
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