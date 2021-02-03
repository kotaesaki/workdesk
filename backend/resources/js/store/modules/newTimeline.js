import axios from "axios";

const state ={
    post : null
};

const getters = {
    post: state => state.post ? state.post: ''
};

const mutations = {
    setPost(state,post){
        state.post = post;
    }
};

const actions = {
    async getPost(context){ 
        await axios.get('/api/timeline').then((result)=>{
            context.commit("setPost", result.data);
            console.log(result.data);
            return result.data;
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
