<template>
    <div class="container">
        <div class="row justify-content-center">
            <router-view name="mypage" :userId="userId"></router-view>
            <router-view name="follow" :userId="userId"></router-view>
            <router-view name="follower" :userId="userId"></router-view>
            <router-view name="mytag" :userId="userId"></router-view>
            <router-view name="mylikes" :userId="userId"></router-view>
            <mypage-bar :userId="userId"></mypage-bar>
        </div>
    </div>   
</template>
<script>
import MypageBar from './MypageBar.vue';
import MypageContent from './MypageContent.vue';
export default {
    components: { MypageBar, MypageContent },
    props: {
        userId: String //idを取得
    },
    methods: {
        async updatePost(userId) {
            await this.$store.commit('mypage/clearVar')
                .then(()=>this.$store.dispatch('mypage/startPost', userId))
        },
    },
    beforeRouteUpdate (to, from, next) {
        console.log('route update start')
        console.log(from);
        console.log(to)
        if(to.name == 'mypage'){
            this.updatePost(to.params.userId);
        }
        next();
    },

}
</script>
