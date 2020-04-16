import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies'

//Vue = require('vue');
//Vuex = require('vuex');

Vue.use(Vuex);
Vue.use(VueCookies);

const axios = require('axios').create()

const store = new Vuex.Store({
  state: {
    user_infos: {},
    standby_vid: 0,
    active_vids: [],
    passive_vids: [],
    // status: false
  },
  mutations: {
    //ログインしてるかどうか true or false
    //onUserStatusChanged(state, status) {
    //  state.status = status; 
    //},
    // ユーザ情報登録
    registerUserInfo(state, user_info) {
      state.user_infos[user_info[0]] = user_info[1]
    },
    updateVids(state) {
      // standby_vidをactive_vidsにアペンド
      state.active_vids.push(state.standby_vid)
      if (state.passive_vids.length == 0){
        // passive_vidsがない時、active_vidsの末尾+1をstandby_vidにセット
        state.standby_vid = state.active_vids[state.active_vids.length-1] + 1
      } else {
        // passive_vidsがある時、これの先頭をstandby_vidにセットし、passive_vidsから削除
        state.standby_vid = state.passive_vids.shift()
      }
    }
  },
  getters: {
    user_infos(state) {
      return state.user_infos;
    },
    //isSignedIn(state) {
    //  return state.status;
    //}
    standby_vid(state) {
      return state.standby_vid;
    },
  },
  actions: {
    getToken: async function ({ commit, getters }, payload) {

      // ランダム文字列とリダイレクトURL取得
      const response = await axios.get("http://192.168.0.3:5000/access", {
        params: {
          screen_name: payload.screen_name
        }
      })

      // クッキー情報をキーとしてランダム文字列とスクリーンネームを格納
      const user_info = [
        getters.standby_vid,
        {
          "screen_name": payload.screen_name,
          "token": response.data.random_str
        }
      ]
      commit("registerUserInfo", user_info)
      
      // クッキー情報をセット
      Vue.$cookies.set("vid", getters.standby_vid)
      
      // クッキー情報(vid)を更新
      commit("updateVids")

      // リダイレクト
      const redirect_url = response.data.redirect_url
      if (redirect_url != null) {
        window.location.href = redirect_url
      }
    }
  }
});


// store.state.user_infos
// store.getters.standby_vid
// store.dispatch('getToken', {screen_name: 'shkashkashkas'})
// store.dispatch('getToken', {screen_name: 'hode'})

export default store
