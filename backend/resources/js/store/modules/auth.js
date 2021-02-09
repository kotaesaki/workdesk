import axios from 'axios';

const state = {
    user: null,
    profile: null,
    token: window.localStorage.getItem('token'),
};
const getters = {
    check: state => !!state.user,
    user: state => state.user ? state.user: '',
    profile: state => state.profile ? state.profile: '', 
    token: state => state.token ? state.token: ''
};
const mutations = {
    setUser(state,user){
        state.user = user;
    },
    setToken(state,token){ 
        window.localStorage.setItem('token',token);
    },
    setProfile(state,profile){
        state.profile = profile;
    },
    deleteUser(state,user){
        state.user = user;
    },
};
const actions = {
    register(context, data) {
        axios.post('/api/register', data, {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            console.log(data);
            context.commit("setUser", result.data.user);
            context.commit("setToken", result.data.token);
            context.commit("setProfile", result.data.profile);
        }).catch(error => {
            console.log(`Error! HTTP Status: ${error}`);
            console.log(data);
        });
    },
    login(context, data){
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', data, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                }
            }).then((result) => {
                console.log(data);
                context.commit("setUser", result.data.user);
                context.commit("setProfile", result.data.profile);
                context.commit("setToken", result.data.token);
            }).catch(error => {
                console.log(`Error! HTTP Status: ${error}`);
                console.log(data);
            });
        });
        
    },
    logout(context, data) {
        axios.post('/api/logout', data, {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            console.log(data);
            context.commit("deleteUser", null);
            context.commit("setToken", null);
            context.commit("setProfile", null);
        }).catch(error => {
            console.log(`Error! HTTP Status: ${error}`);
        });
    },
    async fetchUser(context){
        await axios.get('/api/user', {
            headers: {
                Authorization: `Bearer ${state.token}`
            }
        }).then((result)=>{
            context.commit("setUser", result.data.user);
            context.commit("setProfile", result.data.profile);
            console.log(result.data);
        }).catch(error=>{
            console.log(`Error! HTTP Status: ${error}`);
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