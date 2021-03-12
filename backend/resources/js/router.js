import Vue from 'vue'
import VueRouter from 'vue-router'
import VueLoaders from 'vue-loaders'
import store from './store'
import { ContentLoader } from 'vue-content-loader'

Vue.use(VueRouter)
Vue.use(VueLoaders)

import HeaderComponent from './components/HeaderComponent'
import NotFoundComponent from './components/top/NotFoundComponent'
import MypageComponent from './components/mypage/MypageComponent'
import FooterComponent from './components/common/Footer'
import Search from './components/common/Search'
import TagComponent from './components/top/TagComponent'
import MypageBar from './components/mypage/MypageBar'
import ProfileLoader from './components/mypage/ProfileLoader'
import MypageContent from './components/mypage/MypageContent'
import MypageLikes from './components/mypage/MypageLikes'
import Mytag from './components/mypage/Mytag'
import PostUploadComponent from './components/posts/PostUploadComponent'
import PostImageForm from './components/posts/PostImageForm'
import PostItemForm from './components/posts/PostItemForm'
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
import IndividualLoader from './components/top/IndividualLoader'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Loading from './components/common/Loading'

Vue.component('header-component', HeaderComponent)
Vue.component('footer-component', FooterComponent)
Vue.component('search-component', Search)
Vue.component('individual-comment', IndividualComment)
Vue.component('individual-loader', IndividualLoader)
Vue.component('mypage-bar', MypageBar)
Vue.component('profile-loader', ProfileLoader)
Vue.component('mypage-content', MypageContent)
Vue.component('follow-content', FollowContent)
Vue.component('mypage-likes', MypageLikes)
Vue.component('settings-bar', settingsBar)
Vue.component('profile-image-form', ProfileImageForm)
Vue.component('post-image-form', PostImageForm)
Vue.component('post-tag-form', PostTagForm)
Vue.component('post-item-form', PostItemForm)
Vue.component('loading', Loading)
Vue.component('content-loader', ContentLoader)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent,
      props: true,
      meta: {isPublic: true},
      children: [
        {
          path: '/',
          name: 'home',
          components: {
            home: NewTimeline,
          },
          props: true,
          meta: {isPublic: true},
        },
        {
          path: '/trend',
          name: 'trend',
          components: {
            trend: TrendTimeline,
          },
          props: true,
          meta: {isPublic: true},
        },
        {
          path: '/item',
          name: 'item',
          components: {
            item: TrendItem,
          },
          props: true,
          meta: {isPublic: true},
        }
      ]
    },
    {
      path: '/photo/:postId',
      name: 'individual',
      component: Individual,
      props: true,
      meta: {isPublic: true},
    },
    {
      path: '/tag/:tagId',
      name: 'tag',
      component: TagComponent,
      props: true,
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
        if (store.getters['auth/check']){
          next('/')
        } else {
          next()
        }
      }
    },
    { 
      name: 'notFound',
      path: '*', 
      component: NotFoundComponent 
    }

  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition || to.name == 'home' ||to.name == 'trend' || to.name == 'item') {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next)=>{
  if (to.matched.some(record => !record.meta.isPublic) && !store.getters['auth/check']){
    next('/login')
  } else {
    next()
  }
})

export default router