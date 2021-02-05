<template>
<div id="wrapper">
    <loading v-show="loading"></loading>
    <div class="container" v-show="!loading">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="contents">
                    <img :src="`../${post.photo_path}`" alt="contents-photo" class="contents-photo">
                    <p class="created-time">{{post.created_at}}</p>
                </div>
                <div class="comments">

                </div>
                <div class="contents-profile">
                    <p>写真を投稿したユーザー</p>
                    <img :src="`../${profile.icon_path}`" alt="contents-photo" class="icon-photo">
                    <p>{{postUser.name}}</p>
                    <p>@{{postUser.login_id}}</p>
                    <div class="follow-button">
                        <i class="fas fa-user-plus"></i>
                        <p>フォローする</p>
                    </div>
                    <p>フォロー</p>
                    <p>フォロワー</p>
                    <span>{{profile.shokai}}</span>
                </div>
            </div>
            <div class="col-md-4">
                <div class="individual-profile">
                    <img :src="`../${profile.icon_path}`" alt="icon-photo" class="icon-photo">
                    <p class="profile-name">{{postUser.name}}</p>
                    <div class="follow" @click="pushFollow" v-show="!followStatus">
                        <i class="fas fa-user-plus"></i>
                        フォローする
                    </div>
                    <div class="unfollow" @click="deleteFollow" v-show="followStatus">
                        <i class="fas fa-user-plus"></i>
                        フォロー解除                        
                    </div>
                    <button class="favorite" v-show="status == false" @click="pushFavorite">いいね</button>
                    <button class="favorite" v-show="status == true" @click="deleteFavorite">いいね解除</button>
                    <p class="count" v-if="countFav!=0">{{countFav+1}}人がいいねしました</p>
                </div>
                <div class="individual-tags">
                    <li class="tag" v-for="tag in tags" :key="tag.tag_id">
                        {{tag.tag_name}}
                    </li>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<script>
import Loading from '../common/Loading.vue';
export default {
  components: { Loading },
    props:{
        postId: String
    },
    data() {
        return {
            
        };
    },
    computed: {
        post(){
            return this.$store.getters["individual/post"];
        },
        postUser(){
            return this.$store.getters["individual/user"];
        },
        profile(){
            return this.$store.getters["individual/profile"];
        },
        tags(){
            return this.$store.getters["individual/tags"];
        },
        status(){
            return this.$store.getters["individual/status"];
        },
        countFav(){
            return this.$store.getters["individual/countFav"];
        },
        authUser(){
            return this.$store.getters["auth/user"];
        },
        loading(){
            return this.$store.getters["loading/loading"];
        },
        followStatus(){
            return this.$store.getters["follow/status"];
        }

    },
    methods: {
        pushFavorite(){
            this.$store.dispatch('individual/pushFavorite', {post_id: this.post.post_id, user_id: this.authUser.id});
        },
        deleteFavorite(){
            this.$store.dispatch('individual/deleteFavorite', {post_id: this.post.post_id, user_id: this.authUser.id});
        },
        pushFollow(){
            this.$store.dispatch('follow/pushFollow', {auth_user: this.authUser.id, post_user:this.postUser.id});
        },
        deleteFollow(){
            this.$store.dispatch('follow/deleteFollow', {auth_user: this.authUser.id, post_user:this.postUser.id});
        },
    },
    created() {
    },
    mounted() {
        console.log('Individual mount start!');
        const user = this.$store.getters["auth/user"];
        this.$store.dispatch('loading/startLoad')
            .then(()=>this.$store.dispatch('individual/getIndividual', {post_id: this.postId, user_id:this.authUser.id}))
            .then(()=>this.$store.dispatch('loading/endLoad'));        
    },
    watch: {
        authUser(newUser) {
            if(newUser){    
                this.$store.dispatch('individual/getIndividual', {post_id: this.postId, user_id:this.authUser.id})
            }
        },
    },
}
</script>
<style  scoped>
    .icon-photo{
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
    }
    .contents-photo{
        width: 70%;
        height: 70%;
    }
</style>