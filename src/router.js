import Vue from 'vue'
import Router from 'vue-router'
import Followers from './components/Followers.vue'
import Following from './components/Following.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'following',
    component: Following
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
  }
]

const router = new Router({
  mode: 'history',
  routes: routes
})

export default router
