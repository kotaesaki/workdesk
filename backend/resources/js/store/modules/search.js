import router from '../../router'

const state = {
  word: null,
  result: false,
  tagArray: [],
  userArray: []
}
const getters ={
  word: state => state.q ? state.q: '',
  result: state => state.result ? state.result: '',
  tagArray: state => state.tagArray ? state.tagArray: '',
  userArray: state => state.userArray ? state.userArray: ''
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
  }
}
const actions ={
  async trigger({commit}) {
    await axios.get('/api/search', {
      params: {
        q: state.word
      }
    }).then(res=> {
      console.log(res.data)
      commit('setResult', true)
      commit('setTagArray', res.data[0])
      commit('setUserArray', res.data[1])
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