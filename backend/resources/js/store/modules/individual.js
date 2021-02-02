import axios from "axios";

const state = {
    post: null,
    user: null,
    profile: null,
    tags: null
};
const getters = {
    post: state=> state.post ? state.post: '',
    user: state=> state.user ? state.user: '',
    profile: state=> state.profile ? state.profile: '',
    tags: state=> state.tags ? state.tags: ''
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
    }
};
const actions = {
    getIndividual(context, data){
        axios.get('/api/individual',{
            params:{
                post_id: data
            }
        }).then((result)=>{
            console.log(result.data);
            context.commit("setPost", result.data.post);
            context.commit("setUser", result.data.user);
            context.commit("setProfile", result.data.profile);
            context.commit("setTags", result.data.tags);
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