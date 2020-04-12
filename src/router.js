import Vue from 'vue'
import Router from 'vue-router'
import Followers from './components/Followers.vue'
import Following from './components/Following.vue'

Vue.use(Router)


const routes = [
//  {
//    path: '/',
//    name: 'top',
//    component: {
//      template: "",
//      created() {window.location.href="http://192.168.0.3:5000/access"}
//    }
//  },
  {
    path: '/',
    name: 'top',
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
    path: '/get_tw_oauth',
    name: 'get_tw_oauth',
    component: {
      template: "",
      created() {
        // redirect to backend with params()
        let params = "random_str=" + "shikarand" + "&"
        params = params + "oauth_token=" + this.$route.query['oauth_token'] + "&"
        params = params + "oauth_verifier=" + this.$route.query['oauth_verifier']
        const redirect_url = "http://192.168.0.3:5000/register?" + params
        window.location.href = redirect_url
      }
    },
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
