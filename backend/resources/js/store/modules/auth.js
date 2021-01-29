import axios from 'axios';


const state = {
    user: null,
    token: window.localStorage.getItem('token')
};
const getters = {
    check: state => !!state.user,
    user: state => state.user ? state.user: '',
    token: state => state.token ? state.token: ''
};
const mutations = {
    setUser(state,user){
        state.user = user;
    },
    setToken(state,token){ 
        window.localStorage.setItem('token',token);
    }
};
const actions = {
    register(context, data) {
        axios.post('/api/register', data).then((result) => {
            console.log(data);
           context.commit("setUser", result.data.user);
           context.commit("setToken", result.data.token);
        }).catch(error => {
            console.log(`Error! HTTP Status: ${error}`);
            console.log(data);
        });
    },
    login(context, data){
        axios.post('/api/login', data).then((result) => {
            console.log(data);
            context.commit("setUser", result.data.user);
            context.commit("setToken", result.data.token);
        }).catch(error => {
            console.log(`Error! HTTP Status: ${error}`);
            console.log(data);
        });
    },
    logout(context) {
        axios.post('/api/logout', null, {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result) => {
            context.commit("setUser", null);
            context.commit("setToken", null);
        }).catch(error => {
            console.log(`Error! HTTP Status: ${error}`);
        });
    },
    fetchUser(context){
        axios.get('/api/user', null, {
            headers: {
                Authorization: `Bearer ${state.token}`,
            }
        }).then((result)=>{
            context.commit("setUser", result.data.user);
        }).catch(error=>{
            console.log(`Error! HTTP Status: ${error}`);
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