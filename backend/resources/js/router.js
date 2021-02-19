import Vue from 'vue'
import VueRouter from 'vue-router'
import VueLoaders from 'vue-loaders'
import store from './store'

Vue.use(VueRouter)
Vue.use(VueLoaders)

import HeaderComponent from './components/HeaderComponent'
import MypageComponent from './components/mypage/MypageComponent'
import FooterComponent from './components/common/Footer'
import Search from './components/common/Search'
import SearchComponent from './components/top/SearchComponent'
import MypageBar from './components/mypage/MypageBar'
import MypageContent from './components/mypage/MypageContent'
import MypageLikes from './components/mypage/MypageLikes'
import Mytag from './components/mypage/Mytag'
import PostUploadComponent from './components/posts/PostUploadComponent'
import PostImageForm from './components/posts/PostImageForm'
import PostTagForm from './components/posts/PostTagForm'
import Account from './components/settings/Account'
import Profile from './components/settings/Profile'
import FollowContent from './components/follow/FollowContent'
import FollowerContent from './components/follow/FollowerContent'
import ProfileImageForm from './components/settings/ProfileImageForm'
import settingsBar from './components/settings/settingsBar'
import HomeComponent from './components/top/HomeComponent'
import NewTimeline from './components/top/NewTimeline'
import TrendTimeline from './components/top/TrendTimeline'
import TrendItem from './components/top/TrendItem'
import Individual from './components/top/Individual'
import IndividualComment from './components/top/IndividualComment'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Loading from './components/common/Loading'

Vue.component('example-component', require('./components/ExampleComponent.vue').default)
Vue.component('header-component', HeaderComponent)
Vue.component('footer-component', FooterComponent)
Vue.component('search-component', Search)
Vue.component('new-timeline', NewTimeline)
Vue.component('individual-comment', IndividualComment)
Vue.component('trend-timeline', TrendTimeline)
Vue.component('trend-item', TrendItem)
Vue.component('mypage-bar', MypageBar)
Vue.component('mypage-content', MypageContent)
Vue.component('follow-content', FollowContent)
Vue.component('mypage-likes', MypageLikes)
Vue.component('settings-bar', settingsBar)
Vue.component('profile-image-form', ProfileImageForm)
Vue.component('post-image-form', PostImageForm)
Vue.component('post-tag-form', PostTagForm)
Vue.component('loading', Loading)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent,
      props: true,
      meta: {isPublic: true},
    },
    {
      path: '/photo/:postId',
      name: 'individual',
      component: Individual,
      props: true,
      meta: {isPublic: true},
    },
    {
      path: '/search',
      name: 'search',
      component: SearchComponent,
      proops: true,
      meta: {isPublic: true},
    },        
    {
      path: '/mypage/:userId',
      name: 'mypage',
      component: MypageComponent,
      props: true,
      children: [
        {
          path: '/mypage/:userId',
          name: 'mypage',
          components: {
            mypage: MypageContent,
          },
        },
        {
          path: '/follow/:userId',
          name: 'follow',
          components: {
            follow: FollowContent
          }
        },
        {
          path: '/follower/:userId',
          name: 'follower',
          components: {
            follower: FollowerContent
          }
        },
        {
          path: '/mytag/:userId',
          name: 'mytag',
          components: {
            mytag: Mytag
          }
        },
        {
          path: '/mylikes/:userId',
          name: 'mylikes',
          components: {
            mylikes: MypageLikes
          }
        },

      ]
    },
    {
      path: '/account/:userId',
      name: 'account',
      component: Account,
      props: true,
      beforeEnter(to, from, next){
        const user = store.getters['auth/user']
        if (to.params.userId !=user.id){
          console.log('入れません')
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/profile/:userId',
      name: 'profile',
      component: Profile,
      props: true,
      beforeEnter(to, from, next){
        const user = store.getters['auth/user']
        if (to.params.userId !=user.id){
          console.log('入れません')
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/post_upload/:userId',
      name: 'post_upload',
      component: PostUploadComponent,
      props: true,
      beforeEnter(to, from, next){
        const user = store.getters['auth/user']
        if (to.params.userId !=user.id){
          console.log('入れません')
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      props: true,
      meta: {isPublic: true},
      beforeEnter(to, from, next){
        console.log(store.getters['auth/check'])
        if (store.getters['auth/check']){
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true,
      meta: {isPublic: true},
      beforeEnter(to, from, next){
        console.log(store.getters['auth/check'])
        if (store.getters['auth/check']){
          next('/')
        } else {
          next()
        }
      }
    },

  ]
})

router.beforeEach((to, from, next)=>{
    
  if (to.matched.some(record => !record.meta.isPublic) && !store.getters['auth/check']){
    console.log('beforeEach : true')
    next('/login')
  } else {
    console.log('beforeEach : false')
    next()
  }
})

export default router