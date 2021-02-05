<template>
    <div class="col-md-4">
        <div class="loader" v-show="loading">
            <vue-loaders-line-spin-fade-loader/>
        </div>
        <div v-show="!loading">
            <div class="mypage-profile" v-for="value in id" :key="value">
                <img class="userInfo__icon" :src="`../${value.icon_path}`"/> 
                <p>{{value.name}}さん</p>
                <p>@{{value.login_id}}</p>
                <div>フォロー</div>
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
                <li><router-link v-bind:to="{name: 'follow'}">
                    フォロー
                </router-link></li>
                <li><router-link v-bind:to="{name: 'follower'}">
                    フォロワー
                </router-link></li>
                <li><router-link v-bind:to="{name: 'mypage'}">
                    投稿したタグ
                </router-link></li>
                <li><router-link v-bind:to="{name: 'mylikes'}">
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
    computed: {
        loading(){
            return this.$store.getters["loading/loading"];
        }
    },
    mounted() {
        this.$store.dispatch('loading/startLoad')
            .then(()=>this.$store.dispatch('loading/endLoad'));
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
    .loader{
        width:100%;
        height:100%;
        position:fixed;
    }
</style>
