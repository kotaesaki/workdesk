<template>
<div class="wrapper">
    <loading v-show="loading"></loading>
    <div class="container pages" v-show="!loading">
        <div class="row justify-content-center">
            <div class="col-md-1">
                <div class="menu">
                    <div class="curcle">
                        <i class="far fa-heart favorite" v-bind:disabled="isPosting" v-show="status == false" @click="pushFavorite"></i>
                        <i class="fas fa-heart favorite2" v-bind:disabled="isPosting" v-show="status == true" @click="deleteFavorite"></i>
                    </div>
                    <p>{{countFav}}</p><br>
                    <i class="fab fa-twitter twitter"></i>
                </div>
            </div>
            <div class="col-md-7 main">
                <div class="contents">
                    <img :src="`../${post.photo_path}`" alt="contents-photo" class="contents-photo">
                    <p class="created-time">{{post.created_at}}</p>
                    <span class="contents-description">{{post.description}}</span>
                </div>
                <individual-comment class="comment"></individual-comment>
                <div class="contents-profile">
                    <h3>写真を投稿したユーザー</h3>
                    <div>
                        <img :src="`../${profile.icon_path}`" alt="contents-photo" class="icon-photo">
                        <div class="name-id">
                            <p class="pro_name">{{postUser.name}}</p>
                            <router-link v-bind:to="{ name:'mypage', params:{userId:postUser.id}}">@{{postUser.login_id}}</router-link>
                        </div>
                        <div v-show="postUser.id != authUser.id" class="follow-unfollow">
                            <div class="follow" @click="pushFollow" v-show="!followStatus" >
                                <i class="fas fa-user-plus"></i>
                                フォローする
                            </div>
                            <div class="unfollow" @click="deleteFollow" v-show="followStatus">
                                <i class="fas fa-user-plus"></i>
                                フォロー解除                        
                            </div>
                        </div>
                    </div>
                    <div class="follower">
                        <p>{{countFollow}}フォロー</p>
                        <p>{{countFollower}}フォロワー</p>
                    </div>
                    <hr>
                    <span>{{profile.shokai}}</span>
                </div>
            </div>
            <div class="col-md-3 sub">
                <div class="individual-profile">
                    <div>
                        <router-link v-bind:to="{ name:'mypage', params:{userId:postUser.id}}">
                            <img :src="`../${profile.icon_path}`" alt="icon-photo" class="icon-photo">
                        </router-link>
                        <div class="name-id">
                            <p class="pro_name">{{postUser.name}}</p>
                            <a :href="`${profile.website_url}`" v-show="profile.website_url" target="_blank"><i class="fas fa-link"></i></a>
                            <a :href="`${profile.twitter_url}`" v-show="profile.twitter_url" target="_blank"><i class="fab fa-twitter"></i></a>

                        </div>
                    </div>
                    <div class="link">
                        <div v-show="postUser.id != authUser.id" class="ff">
                            <div class="follow" @click="pushFollow" v-show="!followStatus" >
                                <i class="fas fa-user-plus"></i>
                            </div>
                            <div class="unfollow" @click="deleteFollow" v-show="followStatus">
                                <i class="fas fa-user-check"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="individual-tags">
                    <h3>Tags</h3>
                    <ul>
                        <li class="tag" v-for="tag in tags" :key="tag.tag_id">
                            {{tag.tag_name}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<script>
import Loading from '../common/Loading.vue';
import MultipostAboidable from '../../mixins/multipost_aboidable';
import IndividualComment from './IndividualComment.vue';
export default {
    mixins: [MultipostAboidable],
    components: { Loading, IndividualComment },
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
        },
        countFollow(){
            return this.$store.getters['follow/countFollow'];
        },
        countFollower(){
            return this.$store.getters['follow/countFollower'];
        }
    },
    methods: {
        async pushFavorite(){
            this.avoidMultipost(async()=>{
                await this.$store.dispatch('individual/pushFavorite', {post_id: this.post.post_id, user_id: this.authUser.id}); 
            }) 
        },
        async deleteFavorite(){
            this.avoidMultipost(async()=>{
                await this.$store.dispatch('individual/deleteFavorite', {post_id: this.post.post_id, user_id: this.authUser.id});
            })
        },
        async pushFollow(){
            this.avoidMultipost(async()=>{
                this.$store.dispatch('follow/pushFollow', {auth_user: this.authUser.id, post_user:this.postUser.id});
            });
        },
        async deleteFollow(){
            this.avoidMultipost(async()=>{
                this.$store.dispatch('follow/deleteFollow', {auth_user: this.authUser.id, post_user:this.postUser.id});
            });
        },
        async getUser(){
            const user = this.$store.getters["auth/user"];
            if(!user){
                await this.$store.dispatch('auth/fetchUser');
            }
        },
        async getIndividual(){
            await this.$store.dispatch('individual/getIndividual', {post_id: this.postId, user_id:this.authUser.id});
        }
    },
    mounted() {
        console.log('Individual mounted start!');
        this.$store.dispatch('loading/startLoad')
            .then(()=>this.getIndividual())
            .then(()=>this.$store.dispatch('follow/checkFollow', {auth_user: this.authUser.id, post_user:this.postUser.id}))
            .then(()=>this.$store.dispatch('loading/endLoad')) 
            .then(()=>this.$store.dispatch('follow/countFollow', this.postUser.id))
        this.$store.dispatch('comment/getComment', this.postId);
    },
}
</script>
<style  scoped>
    .wrapper{
        background-color: #EDF2F7;
    }
    .pages{
        padding-top: 150px;
    }
    .comment{
        background-color: #FFF;
        border-radius: 10px;
        margin-top: 5%;
    }
    .contents-profile{
        background-color: #FFF;
        border-radius: 10px;
        margin: 6% auto;
        padding: 5%;
    }
    .contents-profile h3 {
        font-size: 1.3rem;
    }
    .contents-profile .name-id{
        float: left;
    }
    .contents-profile .pro_name{
        padding: 2% 0 0;
        margin-bottom: 0;
    }
    .contents-profile .follow-unfollow{
        text-align: right;
    }
    .contents-profile .follow{
        display: inline-block;
        border: 1px solid #CFCABF;
        border-radius: 5%;
        padding:7px;
        cursor: pointer;
    }
    .contents-profile .unfollow{
        display: inline-block;
        border: 1px solid #CFCABF;
        border-radius: 5%;
        padding:7px;
        cursor: pointer;
    }
    .contents-profile .unfollow:hover{
        background-color: #2983FD;
        color: #FFF;
    }
    .contents-profile .follow:hover{
        background-color: #2983FD;
        color: #FFF;
    }
    .contents-profile .follower{
        clear: both;
    }
    .follower p {
        display: inline;
        font-size: 0.8rem;
        color: #859099;
    }
    .contents-profile hr{
        border-width: 1px 0 0 0;
        border-style: solid;
        border-color: #CFCABF;
    }
    .created-time{
        font-size: 0.9em;
        color: #859099;
    }
    .contents-description{
        padding: 3%;
    }
    .sub{
        margin-left: 5%;
    }
    .individual-profile{
        background-color: #fff;
        border-radius: 10px;
        position: sticky;
        top: 3%;
    }
    .individual-profile img{
        margin: 5%;
    }
    .individual-profile .pro_name{
        margin-bottom: 0;
        padding: 5% 0 0;
    }
    .individual-profile a{
        font-size:1.2rem;
    }
    .individual-profile .link{
        clear: both;
        padding-bottom: 7%;
    }
    .individual-profile .ff{
        text-align: center;
    }
    .individual-profile .unfollow{
        display: inline-block;
        width: 90%;
        padding: 3% 4%;
        border: 1px solid #2983FD;
        border-radius: 6px;
        font-size: 1.3rem;
        cursor: pointer;
        background-color: #2983FD;
        color: #fff;
        text-align: center;
    }
    .individual-profile .follow{
        display: inline-block;
        width: 90%;
        padding: 3% 4%;
        border: 1px solid #2983FD;
        border-radius: 6px;
        font-size: 1.3rem;
        cursor: pointer;
        text-align: center;

    }
    .individual-profile .unfollow:hover{
        background-color: blue;
        color: #fff;
    }
    .individual-tags{
        background-color: #fff;
        border-radius: 10px;
        margin: 13% 0;
        position: sticky;
        top: 22%;
    }
    .individual-tags h3{
        text-align: center;
        padding: 3% 0;
    }
    .individual-tags ul{
        padding: 5%;
    }
    .individual-tags li{    
        list-style: none;
        border: 1px solid #CFCABF;
        border-radius: 7px;
        display: inline-block;
        padding: 1% 2%;
        margin: 2% 3% 3% 3%;
        cursor: pointer;
    }
    .individual-tags li:hover{
        background-color: #CFCABF;
    }
    .icon-photo{
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        float: left;
        margin: 1% 2% 0 0;
    }
    .contents-photo{
        width: 100%;
    }
    .menu{
        text-align: center;
        position: fixed;
    }
    .curcle{
        border: 1px solid #fff;
        background-color: #fff;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        padding:24%;
    }
    .menu p{
        display: inline;
        margin: 0;
    }
    .menu .twitter{
        font-size: 1.7rem;
        color: grey;
    }
    .menu .twitter:hover{
        color: #000;
    }
    .favorite{
        font-size: 1.2rem;
        vertical-align: middle;
    }
    .favorite2{
        font-size: 1.2rem;
        color: #F66685;
        vertical-align: middle;
    }
    .favorite:hover{
        color: red;
    }
    .favorite2:hover{
        color: red;
    }
</style>