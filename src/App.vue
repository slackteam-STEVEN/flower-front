<template>
  <div id="app">
    <el-container>

      <el-aside width="200px">
        <el-menu mode="vertical" default-active="0">
          <el-link :href="myInfoData.user_page_url_https">
            <img :src="myInfoData.profile_image_url_https" :width="400" :height="400" />
          </el-link>
          <br/>
          <el-link :href="myInfoData.user_page_url_https">
            {{ myInfoData.name }}
          </el-link>
          <br/>
          {{ myInfoData.at_screen_name }}
          <br/>
          <el-link :href="myInfoData.following_url_https">
            {{ myInfoData.friends_count }}フォロー中
          </el-link>
          <br/>
          <el-link :href="myInfoData.followers_url_https">
            {{ myInfoData.followers_count }}フォロワー
          </el-link>
          
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <el-menu :default-active="activeIndex" mode="horizontal" router>
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
        myInfoData: {},
      }
    },
    mounted () {
      this.getMyInfo()
    },
    methods: {
      getMyInfo: async function () {
        const response = await axios.get('http://192.168.0.3:5000/get_myinfo')
        this.myInfoData = response.data.context
        this.myInfoData["at_screen_name"] = "@" + this.myInfoData["screen_name"]
        this.myInfoData["user_page_url_https"] = "https://twitter.com/" + this.myInfoData["screen_name"]
        this.myInfoData["following_url_https"] = this.myInfoData["user_page_url_https"] + "/following"
        this.myInfoData["followers_url_https"] = this.myInfoData["user_page_url_https"] + "/followers"
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
