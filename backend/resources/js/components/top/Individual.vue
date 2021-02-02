<template>
<div id="wrapper">
    <div class="container">
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
                    <p>{{user.name}}</p>
                    <p>@{{user.login_id}}</p>
                    <div class="follow-button">
                        <i class="fas fa-user-plus"></i>
                        <p>フォローする</p>
                    </div>
                    <p>フォロー</p>
                    <p>フォロワー</p>
                    <span>{{profile.description}}</span>
                </div>
            </div>
            <div class="col-md-4">
                <div class="individual-profile">
                    <img :src="`../${profile.icon_path}`" alt="icon-photo" class="icon-photo">
                    <p class="profile-name">{{user.name}}</p>
                    <div class="follow">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <button class="favorite" @click="pushFavorite">いいね</button>
                </div>
                <div class="individual-tags">
                    <li class="tag" v-for="tag in tags" :key="tag">
                        {{tag.tag_name}}
                    </li>
                </div>

            </div>
        </div>
    </div>
</div>

</template>
<script>
export default {
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
        user(){
            return this.$store.getters["individual/user"];
        },
        profile(){
            return this.$store.getters["individual/profile"];
        },
        tags(){
            return this.$store.getters["individual/tags"];
        }
    },
    methods: {
        pushFavorite(){

        }
    },
    mounted() {
        console.log('Individual mount start!');
        this.$store.dispatch('individual/getIndividual', this.postId);            

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