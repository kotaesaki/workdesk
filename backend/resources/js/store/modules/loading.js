const state ={
  loading: true,
}

const getters ={
  loading: state => state.loading ? state.loading: false,
}

const mutations ={
  setLoading(state, loading){
    state.loading = loading
  },
}
const actions = {
  async startLoad(context){
    context.commit('setLoading', true)
  },
  async endLoad(context){
    context.commit('setLoading', false)
  } 
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}