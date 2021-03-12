import axios from 'axios'

const state = {
  comment: '',
  commentList: [],
  replyId: '',
  linkReply: '',
  loading: false
}
const getters = {
  comment: state => state.comment ? state.comment: '',
  commentList: state => state.commentList ? state.commentList: '',
  replyId: state => state.replyId ? state.replyId: '',
  linkReply: state => state.linkReply ? state.linkReply: '',
  loading: state => state.loading ? state.loading: '',

}
const mutations = {
  setCommentList(state, commentList){
    commentList.forEach(element => {
      element.comment_message = element.comment_message.replace(/\n/g, '<br>')
    })
    state.commentList = commentList
  },
  addCommentList(state, commentList){
    commentList.comment_message = commentList.comment_message.replace(/<br>/g, '\n')
    state.commentList.push(commentList)
    state.comment = null
  },
  updateComment(state, comment){
    state.comment = comment
  },
  setReplyId(state, replyId){
    state.replyId = replyId
  },
  addReplyComment(state, linkReply){
    state.comment += state.replyId
    state.linkReply = linkReply
  },
  setLoading(state, loading){
    state.loading = loading
  },
}
const actions = {
  async pushComment({commit}, data){
    commit('setLoading', true)
    await axios.post('/api/comment', data).then(result=>{
      commit('addCommentList', result.data)
      commit('setLoading', false)
    }).catch(error=>{
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