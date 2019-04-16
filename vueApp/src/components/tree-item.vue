<template>
  <p>
    <span>{{folder.name}}</span>
    <tree v-bind:item-data="folder" ></tree>
  </p>
</template>

<script>
  import tree from '@/components/tree-appoint'
  export default {
    name: 'tree-item',
    props: ['folder'],
    components: {
      tree
    },
    beforeCreate: function () {
      this.$options.components.Tree = require('./tree-appoint.vue')
    },
    created () {
      // console.log('tree-item --> ', this.folder)
    }
  }
</script>

<style scoped>

</style>
