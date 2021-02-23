const state ={
  posts: null,
  loading: false,
}
const getters ={
  posts: state=> state.posts ? state.posts: '',
  loading: state => state.loading ? state.loading: false,
}
const mutations ={
  setPosts(state, posts){
    state.posts = posts
  },
  setLoading(state, loading){
    state.loading = loading
  }
}
const actions = {
  async getPost({commit}){
    commit('setLoading', true)
    await axios.get('/api/trend_timeline').then(res=>{
      console.log(res.data)
      commit('setPosts', res.data)
      commit('setLoading', false)
    }).catch(err=>{
      console.log(err)
      alert('取得に失敗しました。')
      commit('setLoading', false)
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}