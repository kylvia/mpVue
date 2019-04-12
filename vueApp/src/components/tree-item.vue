<template>
  <ul>
    <tree v-bind:item-data="children"></tree>
  </ul>
</template>

<script>
  import tree from '@/components/tree'
  export default {
    name: 'tree-item',
    props: ['children'],
    components: {
      tree
    },
    created () {
      console.log('tree-item --> ', this.children)
    }
  }
</script>

<style scoped>

</style>
