<template>
  <div id="app">
    <el-button @click="test">test</el-button>
    <el-container>

      <el-aside width="200px">
        <el-menu v-if="login_status" mode="vertical" default-active="0">
          <el-link :href="`https://twitter.com/${screen_name}`">
            <img :src="`https://twitter.com/${screen_name}`/photo" :width="400" :height="400" />
          </el-link>
          <br/>
          <el-link :href="`https://twitter.com/${screen_name}`">
            {{ screen_name }}
          </el-link>
          <!--
          <el-link :href="myInfoData.user_page_url_https">
            <img :src="myInfoData.profile_image_url_https" :width="400" :height="400" />
          </el-link>
          <br/>
          <el-link :href="myInfoData.user_page_url_https">
            {{ myInfoData.name }}
          </el-link>
          <br/>
          <el-link :href="myInfoData.user_page_url_https">
            {{ myInfoData.at_screen_name }}
          </el-link>
          <br/>
          <el-link :href="myInfoData.following_url_https">
            {{ myInfoData.friends_count }}フォロー中
          </el-link>
          <br/>
          <el-link :href="myInfoData.followers_url_https">
            {{ myInfoData.followers_count }}フォロワー
          </el-link>
          -->
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
          <el-menu  v-if="login_status" :default-active="activeIndex" mode="horizontal" router>
            <el-menu-item index="following" :route="{ name:'following' }">Following</el-menu-item>
            <el-menu-item index="followers" :route="{ name:'followers' }">Followers</el-menu-item>
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
        //myInfoData: {},
        screen_name: this.$cookies.get("screen_name"),
        random_key: this.$cookies.get("random_key"),
	login_status: this.$cookies.get("status"),
        form: {
          screen_name: '',
	}
      }
    },
    // mounted () {
    //   this.getMyInfo()
    // },
    methods: {
      test: function () {
          console.log(this.$cookies.get("status"))
          console.log(this.$cookies.get("screen_name"))
          console.log(this.$cookies.get("random_key"))
      },
      // getMyInfo: async function () {
      //   const response = await axios.get('http://192.168.0.3:5000/get_myinfo')
      //   //const response = await axios.get('http://localhost:3000/get_myinfo')
      //   this.myInfoData = response.data.context
      //   this.myInfoData["at_screen_name"] = "@" + this.myInfoData["screen_name"]
      //   this.myInfoData["user_page_url_https"] = "https://twitter.com/" + this.myInfoData["screen_name"]
      //   this.myInfoData["following_url_https"] = this.myInfoData["user_page_url_https"] + "/following"
      //   this.myInfoData["followers_url_https"] = this.myInfoData["user_page_url_https"] + "/followers"
      //   console.log(this.$cookies.get('vid') || '')
      // },


      onSubmit: async function () {
        console.log(this.$cookies.get("status"))

        // パラメータにscreen_nameをセット
        var params = new URLSearchParams()
        params.append('screen_name', this.form.screen_name)
        params.append('callback_url', 'http://192.168.0.3:8080/get_tw_oauth')

        // ランダム文字列とリダイレクトURL取得
        await axios.post("http://192.168.0.3:5000/access", params)
        .then(response => {
          console.log(response);

          // ステータスコード取得
          const back_status_code = response.data.status_code
          console.log(back_status_code);

          // クッキー情報にscreen_nameとランダム文字列を格納
          this.$cookies.set("screen_name", this.form.screen_name)
          this.$cookies.set("random_key", response.data.context.random_key)

          // リダイレクト
          const redirect_url = response.data.context.redirect_url
          if (redirect_url != null) {
            window.location.href = redirect_url
          }else {
            //console.log("hode")
            this.$router.push('following')
          }

        }).catch(error => {
          console.log(error);
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
