import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import newtimeline from './modules/newTimeline';
import individual from './modules/individual';

Vue.use(Vuex);

export default new Vuex.Store({
    state: () => ({
        
    }),
    modules: {
        auth,
        newtimeline,
        individual,
    },
    mutations: {},
    actions: {},
    getters: {},
});