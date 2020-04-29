import Vue from 'vue'
import Router from 'vue-router'
import Followers from './components/Followers.vue'
import Following from './components/Following.vue'

const axios = require('axios').create()

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
        console.log("hoge")

        // パラメータにscreen_nameをセット
        var params = new URLSearchParams()
        params.append('callback_url', 'http://192.168.0.3:8080/get_tw_oauth')
        params.append('random_key', this.$cookies.get("random_key"))
        params.append('oauth_verifier', this.$route.query['oauth_verifier'])

        axios.post("http://192.168.0.3:5000/register", params)
        .then(response => {
          console.log(response);

          // ステータスコード取得
          const back_status_code = response.data.status_code
          console.log(back_status_code);

          // クッキー情報にセッション状態を保存
          this.$cookies.set("status", true)

          // リダイレクト
          this.$router.push('following')
        })
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
