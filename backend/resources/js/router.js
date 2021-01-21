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

Vue.directive('show-password', {
    inserted(el) {
        var clone = el.cloneNode();
        clone.id ='';
        clone.type = 'text';
        clone.style.display = 'none';
        clone.addEventListener('input', function(e){
            var inputEvent = document.createEvent('Event');
            inputEvent.initEvent('input',true,false);
            el.value = e.target.value;
            el.dispatchEvent(inputEvent);
        });
        el.parentNode.insertBefore(clone,el);

        var icons = {
            show: '&#x1F441;',
            hide: '&#x1F576;'
        };
        var a = document.createElement('a');
        a.style.position = 'absolute';
        a.style.cursor = 'pointer';
        a.style.fontSize = clone.style.fontSize;
        a.style.color = clone.style.color;
        a.textDecoration = 'none';
        a.innerHTML = icons.show;
        a.addEventListener('click', function(e) {
            if(clone.style.display === 'none') {
                e.target.innerHTML = icons.hide;
                el.style.display = 'none';
                clone.style.display = '';
                clone.value = el.value;
                clone.focus();
            } else {
                e.target.innerHTML = icons.show;
                clone.style.display = 'none';
                el.style.display = '';
                el.value = clone.value;
                el.focus();
            }
            e.preventDefault();
    
        });
        document.body.appendChild(a);

        function alignElement(target) {
            var rect = el.getBoundingClientRect();
            const clientWidth = target.clientWidth;
            const clientHeight = target.clientHeight;
            const left = rect.right - Math.round(clientWidth) - 10;
            const top = rect.top + Math.round(rect.height * 0.5) - Math.round(clientHeight * 0.5);
            target.style.left = window.pageXOffset + left +'px';
            target.style.top = window.pageYOffset + top +'px';
        }
        alignElement(a);
        window.addEventListener('resize', function() {
            alignElement(a);
        });
    },
});


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