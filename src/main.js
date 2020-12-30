import Vue from 'vue'
import App from './Index.vue'
import router from './router'
import store from './store'

// ElementUI https://element.eleme.cn/2.0/#/zh-CN/component/installation
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//全局api
import api from './assets/config/api.js'
Vue.prototype.$api = api


//全局axios配置
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.headers['Content-Type'] = 'application/json';

// const proxyObj = {}
// proxyObj['/'] = {
//     target: 'http://localhost:8080',
//     changeOrigin: true,
//     pathRewrite: {
//         '^/': ''
//     }
// }
// module.exports = {
//     devServer: {
//         host: 'localhost',
//         port: 8080,
//         proxy: proxyObj
//     }
// }

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
