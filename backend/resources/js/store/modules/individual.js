import axios from "axios";

const state = {
    post: null,
    user: null,
    profile: null,
    tags: null,
    status: null,
    countFav: null
};
const getters = {
    post: state=> state.post ? state.post: '',
    user: state=> state.user ? state.user: '',
    profile: state=> state.profile ? state.profile: '',
    tags: state=> state.tags ? state.tags: '',
    status: state=> state.status ? state.status: '',
    countFav: state=> state.countFav ? state.countFav: ''

};
const mutations = {
    setPost(state,post){
        state.post = post;
    },
    setUser(state,user){
        state.user = user;
    },
    setProfile(state,profile){
        state.profile = profile;
    },
    setTags(state,tags){
        state.tags = tags;
    },
    setStatus(state,status){
        state.status = status;
    },
    setCountFav(state,countFav){
        state.countFav = countFav;
    },
    addCount(state){
        ++state.countFav;
    },
    subtractCount(state){
        --state.countFav;
    }


};
const actions = {
    async getIndividual(context, {post_id, user_id}){
        await axios.get('/api/individual',{
            params:{
                post_id: post_id,
                user_id: user_id
            }
        }).then((result)=>{
            console.log(result.data);
            context.commit("setPost", result.data.post);
            context.commit("setUser", result.data.postUser);
            context.commit("setProfile", result.data.profile);
            context.commit("setTags", result.data.tags);
            context.commit('setStatus', result.data.status);
        }).catch(error=>{
            console.log(error);
        })
    },
    pushFavorite(context,data){
        axios.post('/api/favorite',data).then(result =>{
            console.log(result.data);
            context.commit('setStatus', result.data);
            context.commit('addCount');
        }).catch(error=>{
            console.log(error);
        });
    },
    deleteFavorite(context,data){
        axios.delete('/api/favorite',{data: data}).then(result=>{
            console.log(result.data);
            context.commit('setStatus', result.data);
            context.commit('subtractCount');
        }).catch(error=>{
            console.log(error);
        })
    },
};

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}