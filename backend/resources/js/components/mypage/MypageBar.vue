<template>
    <div class="col-md-4">
        <div class="loader-space" v-show="loading">
            <vue-loaders-line-scale-pulse-out color="#CFCABF" scale="2" class="loader"></vue-loaders-line-scale-pulse-out>
        </div>
        <div class="page" v-show="!loading">
            <div class="mypage-profile">
                <img class="userInfo__icon" :src="`../${profile.icon_path}`"/> 
                <p class="name">{{id.name}}さん</p>
                <p class="id">@{{id.login_id}}</p>
                <div class="link">
                    <div v-show="id.id != authUser.id" class="ff">
                        <div class="follow" @click="pushFollow" v-show="!followStatus" >
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <div class="unfollow" @click="deleteFollow" v-show="followStatus">
                            <i class="fas fa-user-check"></i>
                        </div>
                    </div>
                </div>
                <a :href="`${profile.website_url}`" v-if="profile.website_url" target="_blank"><i class="fas fa-link"></i></a>
                <a :href="`${profile.twitter_url}`" v-if="profile.twitter_url" target="_blank"><i class="fab fa-twitter"></i></a>
                <div>
                    <p>{{profile.sex}}性 | {{profile.occupation}} | {{profile.age}}歳</p>
                </div>
            </div>
            <ul id="mypage-item">
                <router-link v-bind:to="{name: 'mypage'}">
                    <li>すべての写真</li>
                </router-link>
                <router-link v-bind:to="{name: 'follow'}">
                    <li>フォロー</li>
                </router-link>
                <router-link v-bind:to="{name: 'follower'}">
                    <li>フォロワー</li>
                </router-link>
                <router-link v-bind:to="{name: 'mytag'}">
                    <li>投稿したタグ</li>
                </router-link>
                <router-link v-bind:to="{name: 'mylikes'}">
                    <li style="border-bottom: 1px solid #CFCABF;">いいねした写真</li>
                </router-link>
            </ul>
            <div class="shokai">
                <div>
                    <p>自己紹介</p>
                    <span>
                        {{profile.shokai}}
                    </span>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import MultipostAboidable from '../../mixins/multipost_aboidable';
export default {
    mixins: [MultipostAboidable],

    props:{
        userId: String,
    },
    data() {
        return {
            loading: true,
        };
    },
    computed: {
        authUser(){
            return this.$store.getters["auth/user"];
        },
        followStatus(){
            return this.$store.getters["follow/status"];
        },
        id(){
            return this.$store.getters['mypage/id']; 
        },
        profile(){
            return this.$store.getters['mypage/profile'];
        },
        posts(){
            return this.$store.getters['mypage/posts'];
        }
    },
    methods: {
        async pushFollow(){
            this.avoidMultipost(async()=>{
                this.$store.dispatch('follow/pushFollow', {auth_user: this.authUser.id, post_user:this.id.id});
            });
        },
        async deleteFollow(){
            this.avoidMultipost(async()=>{
                this.$store.dispatch('follow/deleteFollow', {auth_user: this.authUser.id, post_user:this.id.id});
            });
        },
    },

    created() {
        console.log('created start!');
        this.$store.dispatch('mypage/getId', this.userId)
            .then(()=>this.$store.dispatch('follow/checkFollow', {auth_user: this.authUser.id, post_user:this.id.id}))
            .then(()=> this.loading = false)
    },
/*     watch: {
        userId(newValue, oldValue) {
            console.log('mypagebar watch start');
                this.$store.dispatch('mypage/getId', this.userId)
                    .then(()=>this.$store.dispatch('follow/checkFollow', {auth_user: this.authUser.id, post_user:this.userId}))
        },
    }, */
}
</script>
<style  scoped>
    .page{
        position: sticky;
        top: 5%;
    }
    .mypage-profile{
        text-align: center;
        padding: 12% 0;
    }
    .mypage-profile p{
        margin-bottom: 0;
    }
    .mypage-profile .name{
        padding-top: 5%;
    }
    .userInfo__icon{
        width: 65px;
        height: 65px;
        object-fit: cover;
        border-radius: 50%;
    }
    .loader-space{
        width: 100%;
        height: 100%;
        text-align: center;
    }
    .loader{
        position:fixed;
        top:21%;
    }
    .mypage-profile .link{
        clear: both;
        padding: 5% 0 7%;
    }
    .mypage-profile .ff{
        text-align: center;
    }
    .mypage-profile .unfollow{
        display: inline-block;
        width: 45%;
        padding: 1% 4%;
        border: 1px solid #2983FD;
        border-radius: 6px;
        font-size: 1.3rem;
        cursor: pointer;
        background-color: #2983FD;
        color: #fff;
        text-align: center;
    }
    .mypage-profile .follow{
        display: inline-block;
        width: 45%;
        padding:1% 4%;
        border: 1px solid #2983FD;
        border-radius: 6px;
        font-size: 1.3rem;
        cursor: pointer;
        text-align: center;

    }
    .mypage-profile .unfollow:hover{
        background-color: blue;
        color: #fff;
    }
    ul{
        list-style: none;

    }
    ul a li{
        padding:1rem 1rem;
        border-top: 1px solid #CFCABF;
        color: #443311;
    }
    
    ul li:hover{
        background-color: #CFCABF;
        color: #fff;
    }
    ul > a:hover {
        color: #fff;
    }
    .shokai{
        text-align: center;
    }

</style>
