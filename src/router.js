import Vue from 'vue'
import Router from 'vue-router'
import Followers from './components/Followers.vue'
import Following from './components/Following.vue'
import Error from './components/Error.vue'

Vue.use(Router)

//const Error = {
//    template: '<h1>Not found</h1>'
//};



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
  },
  {
    path: '*',
    name: 'error',
    component: Error
  }
]

const router = new Router({
  mode: 'history',
  routes: routes
})

export default router
