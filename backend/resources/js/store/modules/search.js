import router from '../../router'

const state = {
  word: null,
  result: false,
  tagArray: [],
  userArray: [],
  loading: false,

}
const getters ={
  word: state => state.word ? state.word: '',
  result: state => state.result ? state.result: '',
  tagArray: state => state.tagArray ? state.tagArray: '',
  userArray: state => state.userArray ? state.userArray: '',
  loading: state=> state.loading ? state.loading: '',
}
const mutations ={
  setWord(state, word){
    state.word = word
  },
  setResult(state, result){
    state.result = result
  },
  setTagArray(state, tagArray){
    tagArray.forEach(element => {
      state.tagArray.push(element)
    })
  },
  setUserArray(state, userArray){
    userArray.forEach(element => {
      state.userArray.push(element)
    })
  },
  setLoading(state, loading){
    state.loading = loading
  },
  clearVal(state){
    state.tagArray.length = 0
    state.userArray.length = 0
  },

}
const actions ={
  async trigger({commit}) {
    commit('setResult', true)
    commit('clearVal')
    commit('setLoading', true)
    await axios.get('/api/search', {
      params: {
        q: state.word
      }
    }).then(res=> {
      console.log(res.data)
      commit('setTagArray', res.data[0])
      commit('setUserArray', res.data[1])
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