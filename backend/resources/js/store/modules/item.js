import axios from 'axios'

const state ={
  searchWords: '',
  items: '',
  loading: false
}
const getters = {
  searchWords: state => state.searchWords ? state.searchWords: '',
  items: state => state.items ? state.items: '',
  loading: state => state.loading ? state.loading: false
}
const mutations = {
  setSearchWords(state, searchWords){
    state.searchWords = searchWords
  },
  setItems(state, items){
    state.items = items
  },
  setLoading(state, loading){
    state.loading = loading 
  }
}
const actions = {
  async searchItem({commit, state}){
    commit('setLoading', true)
    await axios.get('/api/searchItem', {
      params: {
        searchWords: state.searchWords
      }
    }).then(res=>{
      console.log(res.data)
      commit('setLoading', false)
      commit('setItems', res.data)
    }).catch(err=>{
      console.log(err)
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