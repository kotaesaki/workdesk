<template>
    <div class="col-md-8">
        <h2>タイムライン</h2>
        <div class="loader-space" v-show="loading">
            <vue-loaders-line-scale-pulse-out color="#CFCABF" scale="5" class="loader"></vue-loaders-line-scale-pulse-out> 
        </div>
        <div v-show="!loading"> 
            <div class="timeline" v-for="post in postData" :key="post" v-show="posts">
                <router-link v-bind:to="{ name:'individual', params: { postId: post.post_id}}">
                    <div class="page-content">
                        <img class="post_image" :src="`../${post.photo_path}`">
                        <div class="right_side">
                            <span>{{post.description}}</span>
                            <div v-for="tags in tagss" :key="tags.tag_id" class="tags">
                                <ul v-for="tag in tags" :key="tag.tag_id">
                                    <li v-if="post.post_id === tag.pivot.post_id">
                                        #{{tag.tag_name}}
                                    </li>
                                </ul>
                            </div>
                            <p>{{post.created_at}}</p>
                        </div>
                    </div>
                </router-link>
            </div>
            <div v-mypage-scroll="infiniteHandler"></div>
        </div>    
    </div>
</template>
<script>
export default {
    props: {
        userId:String,
    },
    data() {
        return {
            loading: true
        };
    },
    computed: {
        posts(){
            return this.$store.getters['mypage/posts'];
        },
        tagss(){
            return this.$store.getters['mypage/tagss'];
        },

        startScrollYOffset(){
            return this.$store.getters['mypage/startScrollYOffset'];
        },
        postData(){
            return this.$store.getters['mypage/postData'];
        },
        id(){
            return this.$store.getters['mypage/id'];
        }


    },
    methods: {
        infiniteHandler(){
            this.$store.commit('mypage/infiniteHandler');
        }
    },
    mounted() {
        console.log('mypageContent mounted start');
            this.$store.dispatch('mypage/startPost', this.userId)
                .then(()=>this.loading = false)
            this.$store.commit('mypage/setstartScrollYOffset',Math.floor(window.innerHeight / 3))
    },


}
</script>

<style  scoped>
    h2{
        padding: 4%;
        font-size: 2rem;
        background-color: #CFCABF;
        box-shadow: 1px 1px 6px grey;
        border-radius: 5px;
        background: linear-gradient(transparent 0%, #CFCABF 95%);

    }
    .timeline:hover{
        opacity: 0.5;
        cursor: pointer;
    }
    .page-content{
        margin:4% 0;
        border-bottom: 1px solid #CFCABF;
    }
    .post_image{
        width: 16vw;;
        float: left;
    }
    .page-content p{
        margin: 0;
        font-size: 0.8em;
        color: #859099;
        clear: both;
    }
    .page-content span{
        padding: 2% 0 0;
        position: relative;
        left: 3%;
    }
    .page-content .tags{
        display: inline-flex;
    }
    .page-content ul {
        list-style: none;
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