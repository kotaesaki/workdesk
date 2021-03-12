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
  source: axios.CancelToken.source(),
  controller: new AbortController(),
  items: null
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
  source: state => state.source ? state.source: 'ないよ',
  items: state => state.items ? state.items: '',
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
  setController(state, controller){
    state.controller = controller
  },
  setItems(state, items){
    state.items = items
  }

}
const actions = {
  async getIndividual({commit, state}, {post_id, user_id}){
    const { signal } = state.controller
    const params = {
      post_id: post_id,
      user_id: user_id
    }
    const query_params = new URLSearchParams(params)
    commit('setLoading', true)
    await fetch(`/api/individual?${query_params}`, { signal })
      .then(result=> result.json())
      .then(result=>{
        commit('setPost', result.post)
        commit('setUser', result.post.user)
        commit('setProfile', result.post.user.profile)
        commit('setTags', result.tags)
        commit('setStatus', result.status)
        commit('setCountFav', result.count_fav)
        commit('setItems', result.items)
        commit('setLoading', false)
      }).catch(error=>{
        commit('setLoading', false)
        console.warn(error)
      })
  },
  async pushFavorite({commit}, data){
    commit('setHeartLoading', true)
    await axios.post('/api/favorite', data).then(result =>{
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
      commit('setStatus', result.data)
      commit('subtractCount')
      commit('setHeartLoading', false)
    }).catch(error=>{
      console.log(error)
      alert('いいねに失敗しました')
      commit('setHeartLoading', false)
    })
  },
  cancel({state}){
    state.controller.abort()
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}