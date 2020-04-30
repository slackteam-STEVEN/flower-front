<template>
  <div id="app">
    <!--
    <el-button @click="test">test</el-button>
    -->
    <el-container>
      <el-aside width="200px">
        <el-menu v-if="$cookies.get('status')" mode="vertical" default-active="0">
          <el-link :href="`https://twitter.com/${screen_name}`">
            <img :src="`https://twitter.com/${screen_name}`/photo" :width="400" :height="400" />
          </el-link>
          <br/>
          <el-link :href="`https://twitter.com/${screen_name}`">
            {{ screen_name }}
          </el-link>
        </el-menu>
        <el-menu v-else mode="vertical" default-active="0">
          <span>Login</span>
          <el-form ref="form" :model="form" label-width="20px">
            <el-form-item label="@">
              <el-input v-model="form.screen_name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="float: right" type="primary" @click="onSubmit">Login</el-button>
            </el-form-item>
          </el-form>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <el-menu  v-if="$cookies.get('status')" :default-active="activeIndex" mode="horizontal" router>
            <el-menu-item index="followers" :route="{ name:'followers' }">Followers</el-menu-item>
            <el-menu-item index="following" :route="{ name:'following' }">Following</el-menu-item>
          </el-menu>
          <router-view />
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  const axios = require('axios').create()
  export default {
    name: 'app',
    data () {
      return {
        activeIndex: this.$route.name,
        screen_name: this.$cookies.get("screen_name"),
        form: {
          screen_name: '',
	}
      }
    },
    methods: {
      //test: function () {
      //    console.log(this.$cookies.get("status"))
      //    console.log(this.$cookies.get("screen_name"))
      //    console.log(this.$cookies.get("random_key"))
      //},
      onSubmit: async function () {

        // パラメータにscreen_nameをセット
        var params = new URLSearchParams()
        params.append('screen_name', this.form.screen_name)
        params.append('callback_url', process.env.VUE_APP_FRONTEND_URL + '/get_tw_oauth')

        // ランダム文字列とリダイレクトURL取得
        await axios.post(process.env.VUE_APP_BACKEND_URL + '/access', params)
        .then(response => {

          // ステータスコード別処理
          if (response.data.status_code == 200) {

            // クッキー情報にscreen_nameとランダム文字列を格納
            this.$cookies.set("screen_name", this.form.screen_name)
            this.$cookies.set("random_key", response.data.context.random_key)

            // リダイレクト
            const redirect_url = response.data.context.redirect_url
            if (redirect_url != null) {
              window.location.href = redirect_url
            }else {
              this.$cookies.set("status", true)
              this.$router.push('following')
              window.location.href = process.env.VUE_APP_FRONTEND_URL + '/following'
            }
          } else {
            console.log(response)
            window.location.href="/error.html"  
          }

        }).catch(error => {
          console.log(error);
          window.location.href="/error.html"
        });
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  a {
    text-decoration: none;
  }
  img {
    border-radius: 50%;
    width:  60px;
    height: 60px;
  }
</style>
