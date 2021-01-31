<template>
    <nav id="header-nav" class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <router-link v-bind:to="{name: 'home'}">
                WorkDesk
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent" v-if="isLogin">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img :src="`../${profile.icon_path}`" class="icon_name"> 
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <router-link class="dropdown-item" v-bind:to="{name: 'mypage', params: {userId: user.id }}">
                            マイページ
                        </router-link>
                        <router-link class="dropdown-item" v-bind:to="{name: 'post_upload', params: {userId: user.id }}">
                            投稿
                        </router-link>
                        <router-link class="dropdown-item" v-bind:to="{name: 'account', params: {userId: user.id}}">
                            設定
                        </router-link>
                        <button class="dropdown-item" v-on:click="logout">
                            ログアウト
                        </button>
                    
                    </div>

                    </li>
                </ul>
            </div>
            <div v-else>
                <router-link v-bind:to="{name: 'register'}">
                    新規登録
                </router-link>
                <router-link v-bind:to="{name: 'login'}">
                    ログイン
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        props:{

        },
        data() {
            return {
            };
        },
        computed: {
            isLogin(){
                return this.$store.getters["auth/check"];
            },
            user(){
                return this.$store.getters["auth/user"];
            },
            profile(){
                return this.$store.getters["auth/profile"];
            }
        },
        methods: {
            logout(context, data) {
                this.$store.dispatch('auth/logout', this.$store.getters["auth/user"]).then(()=>{
                    this.$router.push({ name: "login" });
                });        
            },
            getUser(){
                this.$store.dispatch('auth/fetchUser');
            },
        },
        mounted() {
            const token = this.$store.getters["auth/token"];
            const user = this.$store.getters["auth/user"];
            if(token && !user){
                console.log('fetchUser()メソッドスタート');
                console.log(token);
                this.$store.dispatch('auth/fetchUser');
            }
        },
    }
</script>
<style scoped>
    nav{
        background-color: aqua;
        height: 60px;
        
    }
    .icon_name{
        width: 35px;
        height: 35px;
        object-fit: cover;
        border-radius: 50%;
    }
</style>