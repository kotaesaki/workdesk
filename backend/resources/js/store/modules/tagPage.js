const state = {
  data: '',
  tag: '',
  loading: false
}
const getters = {
  data: state => state.data ? state.data : '',
  tag: state => state.tag ? state.tag : '',
  loading: state => state.loading ? state.loading: '',

}
const mutations = {
  setData(state, data){
    state.data = data
  },
  setTag(state, tag){
    state.tag = tag
  },
  setLoading(state, loading){
    state.loading = loading
  }
}
const actions ={
  async getTag({commit}, tag_id) {
    commit('setLoading', true)
    await axios.get('/api/tag', {
      params: {
        tag_id: tag_id
      }
    }).then(res=>{
      commit('setData', res.data[0])
      commit('setTag', res.data[1])
      commit('setLoading', false)
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