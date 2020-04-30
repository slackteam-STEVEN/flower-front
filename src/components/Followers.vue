<template>
  <div class="followers">
    <list route="followers" :params="params"></list>
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
