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
    async pushFollow(context, data){
        await axios.post('/api/follow',data).then(result=>{
            context.commit('setStatus',result.data);
        }).catch(error=>{
            console.log(error);
        })
    },
    async deleteFollow(context,data){
        await axios.delete('/api/follow', {data:data}).then(result=>{
            context.commit('setStatus', result.data);
        }).catch(error=>{
            console.log(error);
        })
    },
    async checkFollow({commit}, {auth_user,post_user}){
        await axios.get('/api/follow',{
            params:{
                auth_user: auth_user,
                post_user: post_user
            }
        }).then(result=>{
            commit('setStatus', result.data)
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