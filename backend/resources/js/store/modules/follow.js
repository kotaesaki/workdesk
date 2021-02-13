import axios from "axios";

const state={
    status: null,
    follow: null,
    follower: null,
    countFollow: null,
    countFollower: null,
};

const getters = {
    status: state =>state.status ? state.status: '',
    follow: state =>state.follow ? state.follow: '',
    follower: state => state.follower ? state.follower: '',
    countFollow: state => state.countFollow ? state.countFollow: '',
    countFollower: state => state.countFollower ? state.countFollower: '',
};

const mutations = {
    setStatus(state,status){
        state.status = status;
    },
    setFollow(state,follow){
        state.follow = follow;
    },
    setFollower(state,follower){
        state.follower = follower;
    },
    setcountFollow(state,countFollow){
        state.countFollow = countFollow;
    },
    setcountFollower(state,countFollower){
        state.countFollower = countFollower;
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
    checkFollow({commit}, {auth_user,post_user}){
        axios.get('/api/follow',{
            params:{
                auth_user: auth_user,
                post_user: post_user
            }
        }).then(result=>{
            commit('setStatus', result.data)
        }).catch(error=>{
            console.log(error);
        })
    },
    async showFollow({commit}, user_id){
        axios.get('/api/follow/'+ user_id, {
            params:{
                user_id: user_id
            }
        }).then(result=>{
            console.log(result.data);
            commit('setFollow', result.data.follow);
        }).catch(error=>{
            console.log(error);
        })
    },
    async showFollower({commit}, user_id){
        axios.get('/api/follower/'+ user_id, {
            params:{
                user_id: user_id
            }
        }).then(result=>{
            console.log(result.data);
            commit('setFollower', result.data.follower.follow_users);
        }).catch(error=>{
            console.log(error);
        })
    },
    countFollow({commit},user_id){
        axios.get('/api/countFollow',{
            params:{
                user_id:user_id
            }
        }).then(result=>{
            commit('setcountFollow',result.data[0]);
            commit('setcountFollower',result.data[1]);
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