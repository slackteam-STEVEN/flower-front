<template>
  <div class="following">
    <el-table class="data-table" :data="tableData" stripe>
      <el-table-column label="アイコン" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.profile_image_url_https" />
        </template>
      </el-table-column>
      <el-table-column label="名前" width="200">
        <template slot-scope="scope">
          <el-link :href="scope.row.profile_image_url_https" type="primary">
            {{scope.row.name}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="screen_name" label="スコープ名" width="100"></el-table-column>
      <el-table-column prop="description" label="ひとこと" width="400"></el-table-column>
      <el-table-column prop="friends_count" label="Following" width="100"></el-table-column>
      <el-table-column prop="followers_count" label="Followers" width="100"></el-table-column>
      <el-table-column>
        <el-button type="danger">フォロー除外</el-button>
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
      tableData: []
    }
  },
  mounted () {
    this.updataTableData()
  },
  methods: {
    updataTableData: async function () {
      const response = await axios.get('http://localhost:5000/get_follow')
      this.tableData = response.data.contents
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
