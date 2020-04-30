<template>
  <div class="following">
    <list route="following" :params="params"></list>
  </div>
</template>

<script>
export default {
  components: {
    List: () => import('./List.vue')
  },
  data() {
    return {
      params: {}
    }
  }
}
</script>
