import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import newtimeline from './modules/newTimeline';
import individual from './modules/individual';
import loading from './modules/loading';
import follow from './modules/follow';
import comment from './modules/comment';

Vue.use(Vuex);

export default new Vuex.Store({
    state: () => ({
        
    }),
    modules: {
        auth,
        newtimeline,
        individual,
        loading,
        follow,
        comment,
    },
    mutations: {},
    actions: {},
    getters: {},
});