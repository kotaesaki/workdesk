import axios from 'axios'

const state = {
  comment: null,
  commentList: [],
  loading: false
}
const getters = {
  comment: state => state.comment ? state.comment: '',
  commentList: state => state.commentList ? state.commentList: '',
  loading: state => state.loading ? state.loading: '',

}
const mutations = {
  setCommentList(state, commentList){
    state.commentList = commentList
  },
  addCommentList(state, commentList){
    state.commentList.push(commentList)
    state.comment = null
  },
  updateComment(state, comment){
    state.comment = comment
  },
  setLoading(state, loading){
    state.loading = loading
  },
}
const actions = {
  async pushComment({commit}, data){
    commit('setLoading', true)
    await axios.post('/api/comment', data).then(result=>{
      console.log('コメント登録できました')
      commit('addCommentList', result.data)
      commit('setLoading', false)
    }).catch(error=>{
      console.log(error)
      alert('コメントに失敗しました')
      commit('setLoading', false)
    })
  },
  async getComment({commit}, post_id){
    await axios.get('/api/comment', {
      params: {
        post_id: post_id
      }
    }).then(result=>{
      console.log(result.data)
      commit('setCommentList', result.data)
    }).catch(error=>{
      console.log(error)
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