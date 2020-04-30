import Vue from 'vue'
import Router from 'vue-router'
import Followers from './components/Followers.vue'
import Following from './components/Following.vue'

const axios = require('axios').create()

Vue.use(Router)


const routes = [
  {
    path: '/',
    name: 'top',
    component: Followers
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
        // パラメータにscreen_nameをセット
        var params = new URLSearchParams()
        params.append('callback_url', process.env.VUE_APP_FRONTEND_URL + '/get_tw_oauth')
        params.append('random_key', this.$cookies.get("random_key"))
        params.append('oauth_verifier', this.$route.query['oauth_verifier'])

        axios.post(process.env.VUE_APP_BACKEND_URL + "/register", params)
        .then(response => {
          // ステータスコード取得
          console.log(response.data.status_code);
         
          if (response.data.status_code == 200) {
            // クッキー情報にセッション状態を保存
            this.$cookies.set("status", true)

            // リダイレクト
            this.$router.push('following')
          } else {
            console.log(response)
            window.location.href="/error.html"
          }

        }).catch(error => {
          console.log(error);
          window.location.href="/error.html"
        });
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
