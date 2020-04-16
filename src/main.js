import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import store from "./store"
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import './plugins/element.js'

Vue.config.productionTip = true

Vue.use(VueAxios, axios)
Vue.use(VueCookies)


new Vue({
  router,
//  store,
  render: h => h(App),
}).$mount('#app')

//Vue.$cookies.config('7d')
