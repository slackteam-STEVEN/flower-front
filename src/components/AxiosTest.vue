<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>This is a home page</h1>
    <p v-if="errored" v-cloak>{{ error }}</p>
    <p v-if="loading" v-cloak>Loading...</p>
    <div v-else>
<!--
      <ul>
        <li v-for="todo in todos" :key="todo.id" v-cloak>{{todo.title}}</li>
        <p>{{result}}</p>
      </ul>
-->
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.6/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js"></script>

<script>

export default {
  name: 'home',

  //// https://jsonplaceholder.typicode.com/todos のuserID=1 のタイトルを取得
  //data () {
  //  return {
  //    loading: true,
  //    errored: false,
  //    error: null,
  //    todos: null,
  //  };
  //},
  //created () {
  //  this.$axios
  //    .get('https://jsonplaceholder.typicode.com/todos', {
  //      params: {
  //        userId: '1'
  //      }
  //    })
  //    .then(response => {
  //      this.todos = response.data;
  //    })
  //    .catch(err => {
  //      (this.errored = true), (this.error = err);
  //    })
  //    .finally(() => (this.loading = false));
  //}

  data () {
    return {
      loading: true,
      errored: false,
      error: null,
      result: null,
    };
  },
  created () {
    this.$axios
      //.get('http://localhost:8001/cgi-bin/index.cgi', {
      .get('/cgi-bin/index.cgi', {
        params: {
          a: 4,
          b: 2
        }
      })
      .then(res => this.result = res.data)
      .catch(err => {
        (this.errored = true), (this.error = err), (this.result = 0);
      })
      .finally(() => (this.loading = false));
  }
}

</script>
