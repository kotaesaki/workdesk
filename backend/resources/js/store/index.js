import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import newtimeline from './modules/newTimeline';

Vue.use(Vuex);

export default new Vuex.Store({
    state: () => ({
        
    }),
    modules: {
        auth,
        newtimeline
    },
    mutations: {},
    actions: {},
    getters: {},
});