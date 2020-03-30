<template>
  <div class="followers">
    <el-table class="data-table" :data="tableData" stripe max-height="650" style="width: 100%">
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-link :href="scope.row.user_page_url_https">
            <img :src="scope.row.profile_image_url_https" />
          </el-link>
        </template>
      </el-table-column>
      <el-table-column width="200">
        <template slot-scope="scope">
          <el-link :href="scope.row.user_page_url_https">
            {{scope.row.name}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="at_screen_name" width="100"></el-table-column>
      <el-table-column prop="description" width="400"></el-table-column>
      <el-table-column label="フォロー中" width="120">
        <template slot-scope="scope">
          <el-link :href="scope.row.following_url_https">
            {{scope.row.friends_count}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="フォロワー" width="120">
        <template slot-scope="scope">
          <el-link :href="scope.row.followers_url_https">
            {{scope.row.followers_count}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="danger" v-if="scope.row.following=='True'" v-on:click="unfollow(scope.row.screen_name)">
            フォロー除外
          </el-button>
          <el-button type="primary" plain v-else v-on:click="addFollow(scope.row.screen_name)">
            フォロー追加
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

const axios = require('axios').create()

export default {
  name: 'home',
  data () {
    return {
      tableData: [],
    }
  },
  mounted () {
    this.updataTableData()
  },
  methods: {
    updataTableData: async function () {
    
      // back側にフォロー一覧を取得する要求を飛ばす
      const response = await axios.get('http://192.168.0.3:5000/get_follower')
    
      // 内容を保存
      this.tableData = response.data.context
    
      // 内容を一部追加
      this.tableData.forEach(function(data){
        data["at_screen_name"] = "@" + data["screen_name"]
        data["user_page_url_https"] = "https://twitter.com/" + data["screen_name"]
        data["following_url_https"] = data["user_page_url_https"] + "/following"
        data["followers_url_https"] = data["user_page_url_https"] + "/followers"
      })
    
    },
    

    addFollow: function(screen_name) {
      this.$confirm('このユーザをフォローしますか?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'キャンセル',
        type: 'warning'
      }).then(() => {
        this.baseAddFollow(screen_name)
        this.$message({
          type: 'success',
          message: 'フォローしました'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'キャンセルしました'
        });          
      });
    },
    
    
    baseAddFollow: async function (screen_name) {

      // パラメータにscreen_nameをセット
      var params = new URLSearchParams()
      params.append('screen_name', screen_name)
    
      // back側にフォロー追加の要求を飛ばす
      const response = await axios.post('http://192.168.0.3:5000/add_follow', params)
    
      // back側への要求成功の場合、front側の表示用データを変更
      if(response.data.status_code == 200){
        this.tableData.forEach(function(data){
          if(data['screen_name'] == screen_name){
            data['following'] = 'True'
          }
        })
      }
    
    },
    
    
    unfollow: function(screen_name) {
      this.$confirm('このユーザをフォローから除外しますか?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'キャンセル',
        type: 'warning'
      }).then(() => {
        this.baseUnfollow(screen_name)
        this.$message({
          type: 'success',
          message: 'フォローから除外しました'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'キャンセルしました'
        });          
      });
    },
    
    
    baseUnfollow: async function (screen_name) {

      // パラメータにscreen_nameをセット
      var params = new URLSearchParams()
      params.append('screen_name', screen_name)
    
      // back側にフォロー削除の要求を飛ばす
      const response = await axios.post('http://192.168.0.3:5000/unfollow', params)
    
      // back側への要求成功の場合、front側の表示用データを変更
      if(response.data.status_code == 200){
        this.tableData.forEach(function(data){
          if(data['screen_name'] == screen_name){
            data['following'] = 'False'
          }
        })
      }
    
    },


    navigateTargetUrl: function (url) {
      //console.log(url)
      window.open(url, null, "noopener");
    }
  }
}


</script>

<style scoped>
.data-table {
  width: 80%;
  margin: auto;
}
</style>
