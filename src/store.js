import Vue from 'vue';
import Vuex from 'vuex';


//Vue = require('vue');
//Vuex = require('vuex');

Vue.use(Vuex);

const axios = require('axios').create()

const store = new Vuex.Store({
  state: {
    user: "",
    token: "",
    status: false
  },
  mutations: {
    //ユーザー情報
    registerUser(state, user) {
      state.user = user; 
    },
    //ログインしてるかどうか true or false
    onUserStatusChanged(state, status) {
      state.status = status; 
    },
    // token登録
    registerToken(state, token) {
      state.token = token;
    }
    // ユーザ情報登録
    //registerUserInfo(state, info) {
    //  state.user = info.user;
    //  state.token = info.token;
    //}
  },
  getters: {
    user(state) {
      return state.user;
    },
    token(state) {
      return state.token;
    },
    isSignedIn(state) {
      return state.status;
    }
  },
  actions: {
    getToken: async function ({ commit }, payload) {

      // ランダム文字列とリダイレクトURL取得
      const response = await axios.get('http://192.168.0.3:5000/access', {
        params: {
          screen_name: payload.screen_name
        }
      })

      // ランダム文字列をユーザ情報とともに格納
      commit('registerUser', payload.screen_name)
      commit('registerToken', response.data.random_str)

      // リダイレクト
      const redirect_url = response.data.redirect_url
      if (redirect_url != null) {
        window.location.href = redirect_url
      }
    }
  }
});


// store.state.user
// store.state.token
// store.commit('registerUser', {"hoge": 123})
// store.dispatch('getToken', {screen_name: 'shkashkashkas'})
// store.dispatch('getToken', {screen_name: 'hode'})


export default store
