<template>
    <div class="col-md-4">
        <div>
        <div class="mypage-profile" v-for="value in id" :key="value">
            <img class="userInfo__icon" :src="`../${value.icon_path}`"/> 
            <p>{{value.name}}さん</p>
            <p>@{{value.login_id}}</p>
            <a :href="`${value.twitter_url}`" v-if="value.twitter_url" target="_blank"><i class="fab fa-twitter"></i></a>
            <div>
                <p>{{value.sex}}</p>
                <p>{{value.occupation}}</p>
                <p>{{value.age}}</p>
            </div>
        </div>
        <ul id="mypage-item">
            <li><router-link v-bind:to="{name: 'mypage'}">
                すべての写真
            </router-link></li>
            <li><router-link v-bind:to="{name: 'mypage'}">
                フォロー
            </router-link></li>
            <li><router-link v-bind:to="{name: 'mypage'}">
                フォロワー
            </router-link></li>
            <li><router-link v-bind:to="{name: 'mypage'}">
                投稿したタグ
            </router-link></li>
            <li><router-link v-bind:to="{name: 'mypage'}">
                いいねした写真
            </router-link></li>
        </ul>
        <div v-for="value in id" :key="value">
            <div>
                <p>ウェブサイト</p>
                <a :href="`${value.website_url}`" target="_blank">{{value.website_url}}</a>
            </div>
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
export default {
    props:{
        id: Array
    },

}
</script>
<style  scoped>
    .userInfo__icon{
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
    }
</style>
