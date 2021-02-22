import axios from 'axios'

const state = {
  post: null,
  user: null,
  profile: null,
  tags: null,
  status: null,
  countFav: null,
  loading: false,
  heartLoading: false,
  CancelToken: null,
  source: null,
}
const getters = {
  post: state=> state.post ? state.post: '',
  user: state=> state.user ? state.user: '',
  profile: state=> state.profile ? state.profile: '',
  tags: state=> state.tags ? state.tags: '',
  status: state=> state.status ? state.status: '',
  countFav: state=> state.countFav ? state.countFav: '',
  loading: state => state.loading ? state.loading: '',
  heartLoading: state => state.heartLoading ? state.heartLoading: '',
  source: state => state.source ? state.source: '',
  checked: state=>{
    if (state.post==null || state.user==null || state.profile==null || state.tags==null || state.status==null || state.countFav==null){
      return false
    } else {
      return true
    }
  },
}
const mutations = {
  setPost(state, post){
    state.post = post
  },
  setUser(state, user){
    state.user = user
  },
  setProfile(state, profile){
    state.profile = profile
  },
  setTags(state, tags){
    state.tags = tags
  },
  setStatus(state, status){
    state.status = status
  },
  setCountFav(state, countFav){
    state.countFav = countFav
  },
  addCount(state){
    ++state.countFav
  },
  subtractCount(state){
    --state.countFav
  },
  setLoading(state, loading){
    state.loading = loading
  },
  setHeartLoading(state, heartLoading){
    state.heartLoading = heartLoading
  },
  setToken(state, source){
    state.source = source
  },
  cancelToken(state){
    state.source.cancel('リクエストはキャンセルされました')
    console.log('きゃんせるできねええ')
    state.source = axios.CancelToken.source()
  },

}
const actions = {
  async getIndividual({commit, state}, {post_id, user_id}){
    state.CancelToken = axios.CancelToken
    state.source = state.CancelToken.source()
    console.log('state.source:', state.source)
    commit('setLoading', true)
    await axios.get('/api/individual', {
      params: {
        post_id: post_id,
        user_id: user_id
      }
    },
    {
      cancelToken: state.source.token
    }).then((result)=>{
      console.log(state.source)
      commit('setPost', result.data.post)
      commit('setUser', result.data.postUser)
      commit('setProfile', result.data.profile)
      commit('setTags', result.data.tags)
      commit('setStatus', result.data.status)
      commit('setCountFav', result.data.count_fav)
      commit('setLoading', false)
    }).catch(error=>{
      if (axios.isCancel(error)){
        console.log('キャンセルだよ〜〜〜〜')
      } else {
        console.log(error)
      }
    })
  },
  async pushFavorite({commit}, data){
    commit('setHeartLoading', true)
    await axios.post('/api/favorite', data).then(result =>{
      console.log(result.data)
      commit('setStatus', result.data)
      commit('addCount')
      commit('setHeartLoading', false)
    }).catch(error=>{
      console.log(error)
      commit('setHeartLoading', false)
      alert('いいねに失敗しました')
    })
  },
  async deleteFavorite({commit}, data){
    commit('setHeartLoading', true)
    await axios.delete('/api/favorite', {data: data}).then(result=>{
      console.log(result.data)
      commit('setStatus', result.data)
      commit('subtractCount')
      commit('setHeartLoading', false)
    }).catch(error=>{
      console.log(error)
      alert('いいねに失敗しました')
      commit('setHeartLoading', false)
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}