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
}
</script>
