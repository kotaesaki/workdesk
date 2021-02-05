import axios from "axios";

const state={
    status: null
};

const getters = {
    status: state =>state.status ? state.status: '',
};

const mutations = {
    setStatus(state,status){
        state.status = status;
    }
};

const actions = {
    pushFollow(context, data){
        axios.post('/api/follow',data).then(result=>{
            context.commit('setStatus',result.data);
        }).catch(error=>{
            console.log(error);
        })
    },
    deleteFollow(context,data){
        axios.delete('/api/follow', {data:data}).then(result=>{
            context.commit('setStatus', result.data);
        }).catch(error=>{
            console.log(error);
        })
    }
};

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}