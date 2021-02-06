import Vue from "vue";
import VueRouter from "vue-router";
import VueLoaders from 'vue-loaders';

Vue.use(VueRouter);
Vue.use(VueLoaders);

import HeaderComponent from "./components/HeaderComponent";
import MypageComponent from "./components/mypage/MypageComponent";
import MypageBar from "./components/mypage/MypageBar";
import MypageContent from "./components/mypage/MypageContent";
import MypageLikes from "./components/mypage/MypageLikes";
import PostUploadComponent from "./components/posts/PostUploadComponent";
import PostImageForm from "./components/posts/PostImageForm";
import PostTagForm from "./components/posts/PostTagForm";
import Account from "./components/settings/Account";
import Profile from "./components/settings/Profile";
import FollowContent from "./components/follow/FollowContent";
import FollowerContent from "./components/follow/FollowerContent";
import ProfileImageForm from "./components/settings/ProfileImageForm";
import settingsBar from "./components/settings/settingsBar";
import HomeComponent from "./components/top/HomeComponent";
import NewTimeline from "./components/top/NewTimeline";
import TrendTimeline from "./components/top/TrendTimeline";
import TrendItem from "./components/top/TrendItem";
import Individual from "./components/top/Individual";
import IndividualComment from "./components/top/IndividualComment";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Loading from "./components/common/Loading";

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('header-component', HeaderComponent);
Vue.component('new-timeline', NewTimeline);
Vue.component('individual-comment', IndividualComment);
Vue.component('trend-timeline', TrendTimeline);
Vue.component('trend-item', TrendItem);
Vue.component('mypage-bar', MypageBar);
Vue.component('mypage-content', MypageContent);
Vue.component('follow-content', FollowContent);
Vue.component('mypage-likes', MypageLikes);
Vue.component('settings-bar', settingsBar);
Vue.component('profile-image-form', ProfileImageForm);
Vue.component('post-image-form', PostImageForm);
Vue.component('post-tag-form', PostTagForm);
Vue.component('loaging', Loading);




const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path: '/',
            name: 'home',
            component: HomeComponent
        },
        {
            path: '/photo/:postId',
            name: 'individual',
            component: Individual,
            props: true,
        },        
        {
            path: '/mypage/:userId',
            name: 'mypage',
            component: MypageComponent,
            props: true,
            children:[
                {
                    path:'/mypage/:userId',
                    name:'mypage',
                    components: {
                        mypage: MypageContent,
                    }
                },
                {
                    path:'/follow/:userId',
                    name: 'follow',
                    components:{
                        follow:FollowContent
                    }
                },
                {
                    path:'/follower/:userId',
                    name: 'follower',
                    components: {
                        follower:FollowerContent
                    }
                },
                {
                    path:'/mylikes/:userId',
                    name:'mylikes',
                    components:{
                        mylikes: MypageLikes
                    }
                },

            ]
        },
        {
            path: '/account/:userId',
            name: 'account',
            component: Account,
            props: true
        },
        {
            path: '/profile/:userId',
            name: 'profile',
            component: Profile,
            props: true
        },
        {
            path: '/post_upload/:userId',
            name: 'post_upload',
            component: PostUploadComponent,
            props: true
        },
        {
            path: '/register',
            name:'register',
            component: Register,
            props: true
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            props: true
        },
        {
            path: '/logout',
            name: 'logout',
            component: Login,
            props: true
        }

]
})

export default router;