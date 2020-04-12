import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.use(VueAxios, axios, VueCookie)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
