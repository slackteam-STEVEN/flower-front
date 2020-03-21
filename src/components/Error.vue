<template>
  <div class="error">
    <h1>エラーが発生しました。ごめんね。。。</h1>
    <img alt="Vue logo" src="../../public/error.png">
<!--
    <h1>{{ error.statusCode }}</h1> 
    <h1 v-if="error.statusCode === 404">ページが見つかりません</h1>
    <h1 v-else>エラーが発生しました</h1>
-->
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>

<style scoped>
.data-table {
  width: 80%;
  margin: auto;
}
</style>
