import Vue from "vue";
import VueRouter from "vue-router";
 
Vue.use(VueRouter);

import HeaderComponent from "./components/HeaderComponent";
import MypageComponent from "./components/MypageComponent";
import Account from "./components/settings/Account";
import Profile from "./components/settings/Profile";
import ProfileImage from "./components/settings/ProfileImage";
import settingsBar from "./components/settings/settingsBar";
import HomeComponent from "./components/HomeComponent";
import login from "./components/login";

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('header-component', HeaderComponent);
Vue.component('settings-bar', settingsBar);
Vue.component('profile-image', ProfileImage);


const router = new VueRouter({
    mode: 'history',
    routes:[
        
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
            path: '/',
            name: 'home',
            component: HomeComponent
        },
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