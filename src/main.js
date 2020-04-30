import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import './plugins/element.js'

Vue.config.productionTip = true

Vue.use(VueAxios, axios)
Vue.use(VueCookies)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
