require('./bootstrap')

window.Vue = require('vue').default

import Vue from 'vue'
import router from './router'
import './directive'
import store from './store'
import sanitizeHTML from 'sanitize-html'
import VScrollLock from 'v-scroll-lock'
Vue.use(VScrollLock)
const app = async () =>{
  Vue.prototype.$sanitize = sanitizeHTML
  await store.dispatch('auth/fetchUser')
  new Vue({
    el: '#app',
    store,
    router
  })
}

app()
