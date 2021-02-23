import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import newtimeline from './modules/newTimeline'
import trendtimeline from './modules/TrendTimeline'
import individual from './modules/individual'
import loading from './modules/loading'
import follow from './modules/follow'
import comment from './modules/comment'
import mytag from './modules/mytag'
import mypage from './modules/mypage'
import search from './modules/search'
import tagpage from './modules/tagPage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
        
  }),
  modules: {
    auth,
    newtimeline,
    trendtimeline,
    individual,
    loading,
    follow,
    comment,
    mytag,
    mypage,
    search,
    tagpage
  },
  mutations: {},
  actions: {},
  getters: {},
})