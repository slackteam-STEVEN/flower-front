import Vue from 'vue'
import Router from 'vue-router'
import Followers from './components/Followers.vue'
import Following from './components/Following.vue'

Vue.use(Router)


const routes = [
  {
    path: '/',
    name: 'top',
    component: {
      template: "",
      created() {window.location.href="http://192.168.0.3:5000/access"}
    }
  },
  {
    path: '/following',
    name: 'following',
    component: Following
  },
  {
    path: '/followers',
    name: 'followers',
    component: Followers
  },
  {
    path: '*',
    name: 'error',
    component: {
      template: "",
      created() {window.location.href="/error.html"}
    }
  }
]

const router = new Router({
  mode: 'history',
  routes: routes
})

export default router
