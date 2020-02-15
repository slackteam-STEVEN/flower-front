<template>
  <div id="app">
    <el-menu :default-active="activeIndex" mode="horizontal" router>
      <el-menu-item index="home" :route="{ name:'home' }">Home</el-menu-item>
      <el-menu-item index="about" :route="{ name:'about' }">About</el-menu-item>
    </el-menu>
  <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: this.$route.name
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
