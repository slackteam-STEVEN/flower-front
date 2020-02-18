<template>
  <div class="home">
    <el-table class="data-table" :data="tableData" stripe>
      <el-table-column prop="icon" label="アイコン" width="100"></el-table-column>
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
    </el-table>

<!--
    <div>
      <p>{{tableData}}</p>
    </div>
-->

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
      const response = await axios.get('http://localhost:5000/api/spam')
      // const response = await axios.get('http://localhost:5000/test')
      this.tableData = response.data
      // console.log(this.tableData)
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
