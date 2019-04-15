<template>
  <p>
    <span>{{folder.name}}3{{folder.child}}</span>
    <tree v-bind:item-data="folder.child" ></tree>
  </p>
  <!--<ul class="tree-item">{{children}}-->
    <!--<tree v-bind:item-data="children"></tree>-->
  <!--</ul>-->
</template>

<script>
  import tree from '@/components/tree'
  export default {
    name: 'tree-item',
    props: ['folder'],
    components: {
      tree
    },
    beforeCreate: function () {
      this.$options.components.Tree = require('./tree.vue')
    },
    created () {
      console.log('tree-item --> ', this.folder)
    }
  }
</script>

<style scoped>

</style>
