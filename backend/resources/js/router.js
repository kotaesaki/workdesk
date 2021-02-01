import Vue from "vue";
import VueRouter from "vue-router";
 
Vue.use(VueRouter);

import HeaderComponent from "./components/HeaderComponent";
import MypageComponent from "./components/mypage/MypageComponent";
import MypageBar from "./components/mypage/MypageBar";
import MypageContent from "./components/mypage/MypageContent";
import PostUploadComponent from "./components/posts/PostUploadComponent";
import PostImageForm from "./components/posts/PostImageForm";
import PostTagForm from "./components/posts/PostTagForm";
import Account from "./components/settings/Account";
import Profile from "./components/settings/Profile";
import ProfileImageForm from "./components/settings/ProfileImageForm";
import settingsBar from "./components/settings/settingsBar";
import HomeComponent from "./components/top/HomeComponent";
import NewTimeline from "./components/top/NewTimeline";
import TrendTimeline from "./components/top/TrendTimeline";
import TrendItem from "./components/top/TrendItem";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('header-component', HeaderComponent);
Vue.component('new-timeline', NewTimeline);
Vue.component('trend-timeline', TrendTimeline);
Vue.component('trend-item', TrendItem);
Vue.component('mypage-bar', MypageBar);
Vue.component('mypage-content', MypageContent);
Vue.component('settings-bar', settingsBar);
Vue.component('profile-image-form', ProfileImageForm);
Vue.component('post-image-form', PostImageForm);
Vue.component('post-tag-form', PostTagForm);





const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path: '/',
            name: 'home',
            component: HomeComponent
        },        
        {
            path: '/mypage/:userId',
            name: 'mypage',
            component: MypageComponent,
            props: true
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