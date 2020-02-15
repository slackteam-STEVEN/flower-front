<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

<!--
    <h1>This is a home page</h1>
    <p v-if="errored" v-cloak>{{ error }}</p>
    <p v-if="loading" v-cloak>Loading...</p>
    <div v-else>
      <ul>
        <li v-for="todo in todos" :key="todo.id" v-cloak>{{todo.title}}</li>
        <p>{{result}}</p>
      </ul>
    </div>
-->

    <el-table class="data-table" :data="tableData" stripe>
      <el-table-column prop="file_id" label="file_id" width="100"></el-table-column>
      <el-table-column prop="parent_id" label="parent_id" width="100"></el-table-column>
      <el-table-column prop="is_dir" label="is_dir" width="100"></el-table-column>
      <el-table-column label="Name" width="250">
        <template slot-scope="scope">
          <el-link :href="scope.row.url" type="primary">
            {{scope.row.name}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" label="Latest update" width="250"></el-table-column>
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
