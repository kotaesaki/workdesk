<template>
    <div class="new-article">
        <h2 class="title">New Post</h2>
        <div class="contents">
            <div class="content-item" v-for="post in posts" :key="post.post_id">
                <router-link v-bind:to="{ name: 'individual', params: { postId: post.post_id }}">
                    <img :src="`../${post.photo_path}`" alt="card" class="content-img">
                    <div class="content-exsept">
                        <div class="profile">
                            <img :src="`../${post.user.profile.icon_path}`" alt="" class="content-icon">
                            <p class="content-id">@{{post.user.login_id}}</p>
                        </div>
                        <p class="content-description">{{post.description}}</p>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="loader-space" v-show="itemLoading">
            <vue-loaders-ball-spin-fade-loader color="#FFF" class="loader"></vue-loaders-ball-spin-fade-loader>
        </div>
    </div>
    
</template>
<script>
export default {
    computed: {
        loading(){
            return this.$store.getters["loading/loading"];
        },
        posts(){
            return this.$store.getters["newtimeline/items"];
        },
        itemLoading(){
            return this.$store.getters["newtimeline/itemLoading"]
        }
    },
    methods: {
        async getPost() {
            const items = this.$store.getters["newtimeline/items"];
            await this.$store.dispatch('newtimeline/ggetPost');
        },
    },
    mounted() {
        console.log('newTimeline mounted start');
        window.onscroll = () => {
            let bottomOfWindow = document.scrollingElement.scrollTop + window.innerHeight;
            if (bottomOfWindow >= document.documentElement.offsetHeight) {
                this.$store.dispatch('loading/startLoad')
                    .then(()=>this.getPost())
                    .then(()=>this.$store.dispatch('loading/endLoad'));
            }
        };
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
        text-align: center;
    }
    .article{
        width: 100%;
    }

    .contents{
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
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
    .content-exsept{
        padding:10px;
    }
    .content-icon{
        width:50px;
        height: 50px;
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
        height: 20vh;
        position: relative;
        margin: 0 47%;
    }
    .loader{
        position: absolute;
    }
</style>