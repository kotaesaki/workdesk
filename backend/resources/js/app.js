require('./bootstrap');

window.Vue = require('vue').default;

import Vue from 'vue';
import router from './router';
import './directive';


const app = new Vue({
    el: '#app',
    router: router
});

