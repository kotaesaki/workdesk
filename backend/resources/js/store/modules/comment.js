import axios from "axios";

const state = {
    comment: null,
    commentList: []
};
const getters = {
    comment: state => state.comment ? state.comment: '',
    commentList: state => state.commentList ? state.commentList: ''
};
const mutations = {
    setCommentList(state,commentList){
        state.commentList = commentList;
    },
    addCommentList(state,commentList){
        state.commentList.push(commentList);
        state.comment = null;
    },
    updateComment(state,comment){
        state.comment = comment;
    }
}
const actions = {
    async pushComment({commit}, data){
        await axios.post('/api/comment',data).then(result=>{
            console.log('コメント登録できました');
            commit('addCommentList', result.data);
        }).catch(error=>{
            console.log(error);
        })
    },
    async getComment({commit},post_id){
        await axios.get('/api/comment',{
            params:{
                post_id: post_id
            }
        }).then(result=>{
            console.log(result.data);
            commit('setCommentList', result.data);
        }).catch(error=>{
            console.log(error);
        });
    }
};
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}