import Vue from 'vue';
import Vuex from 'vuex';


//Vue = require('vue');
//Vuex = require('vuex');

Vue.use(Vuex);

//const axios = require('axios').create()

const store = new Vuex.Store({
  state: {
    user: {},
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
    getToken: async function ({ commit }) {

      // トークンとリダイレクトURL取得
      //const response = await axios.get('http://192.168.0.3:5000/access')
      //const response = {"data": {"token": "aheahe", "login_ur": "https://google.com"}};
      const response = {"data": {"token": "aheahe"}};

      // トークンをユーザ情報とともに格納
      //commit('registerUserInfo', {"user": {"hoge": 123}, "token": response.data.token})
      commit('registerToken', response.data.token)

      // リダイレクト
      const login_url = response.data.login_url
      if (login_url != undefined) {
        window.location.href = login_url
      }
    }
  }
});


// store.state.user
// store.state.token
// store.commit('registerUser', {"hoge": 123})
// store.dispatch('getToken')


export default store
