// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disabled */
import Vue from 'vue'
import index from './index'
import router from './router'
import store from './vuex'
import axios from 'axios'
import elementUI from 'element-ui'
import '../theme/index.css'
// 引用API文件
import ajax from './api/ajax.js'

// import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI,{size:'small'});

// 将API方法绑定到全局
Object.defineProperty(Vue.prototype,"$ajax",{value:ajax});
// Vue.prototype.$ajax = ajax;

// 引入axios到全局
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://localhost/beeerp/fba/';
Object.defineProperty(Vue.prototype,"$http",{value:axios});
// Vue.prototype.$http = axios;

// WebStorageCache 对HTML5 localStorage 和sessionStorage 进行了扩展，
// 添加了超时时间，序列化方法。可以直接存储json对象，同时可以非常简单的进行超时时间的设置。
let WebStorageCache = require("../node_modules/web-storage-cache/dist/web-storage-cache.min");
Object.defineProperty(Vue.prototype,"$wsCache",{value: new WebStorageCache()});
// Vue.prototype.$wsCache = new WebStorageCache();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    directives: {},
    render: h => h(index)
});
