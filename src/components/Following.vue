<template>
  <div class="following">
    <el-table class="data-table" :data="tableData" stripe>
      <el-table-column prop="name" label="名前" width="200"></el-table-column>
      <el-table-column prop="screen_name" label="スコープ名" width="200"></el-table-column>
      <el-table-column prop="message" label="ひとこと" width="800"></el-table-column>
      <el-table-column prop="following" label="Following" width="200"></el-table-column>
      <el-table-column prop="followers" label="Followers" width="200"></el-table-column>
<!--
      <el-table-column label="名前" width="250">
        <template slot-scope="scope">
          <el-link :href="scope.row.url" type="primary">
            {{scope.row.name}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column>
        <el-button type="danger">Delete</el-button>
      </el-table-column>
-->
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
      const response = await axios.get('http://localhost:5000/following')
      this.tableData = response.data
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
