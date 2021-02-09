require('./bootstrap');

window.Vue = require('vue').default;

import Vue from 'vue';
import router from './router';
import './directive';
import store from './store';


const app = async () =>{
    await store.dispatch('auth/fetchUser');
    new Vue({
        el: '#app',
        store,
        router
    });
}

app()
