<template>
    <nav id="header-nav" class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="/">
                    Laravel
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ user.name }}
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <router-link class="dropdown-item" v-bind:to="{name: 'mypage', params: {userId: user.id }}">
                            マイページ
                        </router-link>
                        <router-link class="dropdown-item" v-bind:to="{name: 'post_upload', params: {userId: user.id }}">
                            投稿
                        </router-link>
                        <router-link class="dropdown-item" v-bind:to="{name: 'account', params: {userId: user.id }}">
                            設定
                        </router-link>
                    </div>

                    </li>
                </ul>
            </div>
        </div>
        <!-- <ul>
            <router-link tag="li" id="home-nav" to="/mypage" exact><a>マイページ</a></router-link>
            <router-link tag="li" id="home-nav" to="/logout" exact><a>ログアウト</a></router-link>
            <a href="/mypage">aa</a>
            <p>{{ user.name}}</p>
        </ul> -->
    </nav>
</template>

<script>
    export default {
        data() {
           
        },
        props:{
            user: {
                type: Object
            }
        }
    }
</script>
<style scoped>
    nav{
        background-color: aqua;
        height: 60px;
        
    }
</style>