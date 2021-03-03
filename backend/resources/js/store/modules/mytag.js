const state = {
  mytag: null
}
const getters = {
  mytag: state => state.mytag ? state.mytag: ''
}
const mutations = {
  setMytag(state, mytag){
    state.mytag = mytag
  }
}
const actions = {
  async getMytag({commit}, user_id){
    await axios.get('/api/mytag/'+ user_id, {
      params: {
        user_id: user_id
      }
    }).then(result=>{
      commit('setMytag', result.data[0])
    }).catch(error=>{
      
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
