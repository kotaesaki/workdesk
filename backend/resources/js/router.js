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
import HomeComponent from "./components/HomeComponent";
import login from "./components/login";

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('header-component', HeaderComponent);
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
        }

]
})

function isLoggedIn() {
    return localStorage.getItem("auth");
}
 
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly)) {
        if (!isLoggedIn()) {
            next("/login");
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
        if (isLoggedIn()) {
            next("/");
        } else {
            next();
        }
    } else {
        next();
    }
});
 
export default router;