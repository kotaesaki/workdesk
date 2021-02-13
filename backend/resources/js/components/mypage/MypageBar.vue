<template>
    <div class="col-md-4 ">
        <div class="loader" v-show="loading">
            <vue-loaders-line-spin-fade-loader/>
        </div>
        <div class="page" v-show="!loading">
            <div class="mypage-profile" v-for="value in id" :key="value">
                <img class="userInfo__icon" :src="`../${value.icon_path}`"/> 
                <p class="name">{{value.name}}さん</p>
                <p class="id">@{{value.login_id}}</p>
                <div class="link">
                    <div v-show="value.id != authUser.id" class="ff">
                        <div class="follow" @click="pushFollow" v-show="!followStatus" >
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <div class="unfollow" @click="deleteFollow" v-show="followStatus">
                            <i class="fas fa-user-check"></i>
                        </div>
                    </div>
                </div>
                <a :href="`${value.website_url}`" v-if="value.twitter_url" target="_blank"><i class="fas fa-link"></i></a>
                <a :href="`${value.twitter_url}`" v-if="value.twitter_url" target="_blank"><i class="fab fa-twitter"></i></a>
                <div>
                    <p>{{value.sex}}性 | {{value.occupation}} | {{value.age}}歳</p>
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
            <div class="shokai" v-for="value in id" :key="value">
                <div>
                    <p>自己紹介</p>
                    <span>
                        {{value.shokai}}
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
        id: Array
    },
    computed: {
        loading(){
            return this.$store.getters["loading/loading"];
        },
        authUser(){
            return this.$store.getters["auth/user"];
        },
        followStatus(){
            return this.$store.getters["follow/status"];
        },
    },
    methods: {
        async pushFollow(){
            this.avoidMultipost(async()=>{
                this.$store.dispatch('follow/pushFollow', {auth_user: this.authUser.id, post_user:this.id[0].id});
            });
        },
        async deleteFollow(){
            this.avoidMultipost(async()=>{
                this.$store.dispatch('follow/deleteFollow', {auth_user: this.authUser.id, post_user:this.id[0].id});
            });
        },
    },
    mounted() {

    },
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
    .loader{
        width:100%;
        height:100%;
        position:fixed;
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
