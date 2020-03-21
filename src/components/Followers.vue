<template>
  <div class="followers">
    <el-table class="data-table" :data="tableData" stripe>
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-link :href="scope.row.user_page_url_https"  v-on:click="navigateTargetUrl(scope.row.user_page_url_https)">
            <img :src="scope.row.profile_image_url_https" />
          </el-link>
        </template>
      </el-table-column>
      <el-table-column width="200">
        <template slot-scope="scope">
          <el-link :href="scope.row.user_page_url_https" type="primary">
            {{scope.row.name}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="screen_name" width="100"></el-table-column>
      <el-table-column prop="description" width="400"></el-table-column>
      <el-table-column prop="friends_count" label="フォロー中" width="100"></el-table-column>
      <el-table-column prop="followers_count" label="フォロワー" width="100"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="danger" v-if="scope.row.following=='True'" v-on:click="unFollow">
            フォロー除外
          </el-button>
          <el-button type="primary" v-else v-on:click="addFollow">
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
      hoge: true
      //hoge: false
    }
  },
  mounted () {
    this.updataTableData()
  },
  methods: {
    updataTableData: async function () {
      const response = await axios.get('http://localhost:5000/get_follower')
      this.tableData = response.data.context
      this.tableData.forEach(function(data){
        data["user_page_url_https"] = "https://twitter.com/" + data["screen_name"]
        data["screen_name"] = "@" + data["screen_name"]
      });
    },
    unFollow: async function () {
      await axios.post('http://localhost:5000/unfollow')
    },
    addFollow: async function () {
      await axios.post('http://localhost:5000/add_follow')
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
