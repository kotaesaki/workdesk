require('./bootstrap');

window.Vue = require('vue').default;

import Vue from 'vue';
import router from './router';
import './directive';
import store from './store';


const app = new Vue({
    el: '#app',
    store,
    router
});

