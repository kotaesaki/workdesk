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

}
const actions = {
  async getIndividual({commit, state}, {post_id, user_id}){
    let cancelToken = {
      cancelToken: state.source.token
    }
    console.log('state.source.token:' + cancelToken)

    commit('setLoading', true)
    await axios.get('/api/individual', {
      params: {
        post_id: post_id,
        user_id: user_id
      }
    }, cancelToken).then((result)=>{
      console.log(state.source)
      commit('setPost', result.data.post)
      commit('setUser', result.data.post.user)
      commit('setProfile', result.data.post.user.profile)
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
  cancel({state}){
    if (typeof state.source != 'undefined'){
      console.log('cancel()スタート')  
      console.log(state.source.cancel)  
      state.source.cancel('何故キャンセルしてくれないんですか')
      state.source = axios.CancelToken.source()
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}