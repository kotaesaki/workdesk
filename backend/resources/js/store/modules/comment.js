import axios from "axios";

const state = {
    comment: null,
};
const getters = {
    comment: state => state.comment ? state.comment: '',
};
const mutations = {
    setComment(state,comment){
        state.comment = comment;
    },
    updateComment(state,comment){
        state.comment = comment;
    }   
}
const actions = {
    pushComment({context}, data){
        axios.post('/api/comment').then(result=>{

        }).catch(error=>{

        })
    }
};
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}