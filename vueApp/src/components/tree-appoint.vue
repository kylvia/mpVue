<template>
  <ul>
    <li v-for="(item, index) in itemData" :key="index">
      <span>{{item.name}}</span>
      <tree-item v-if="item.child" :folder="item.child"></tree-item>
    </li>
  </ul>
</template>

<script>
  import TreeItem from '@/components/tree-item'
  export default {
    name: 'tree',
    components: {
      TreeItem
    },
    props: ['itemData'],
    data () {
      return {
        pleft: 'padding-left: 0rpx'
      }
    },
    beforeCreate: function () {
      // this.$options.components.TreeItem = require('./tree-item')
    },
    created () {
      // console.log('itemData-->', this.itemData)
    },
    methods: {
      countLeft () {
        let num = this.$refs.item.length
        this.pleft = `padding-left:${num * 20}rpx`
      },
      changeToggleOpen () {
        this.itemData.toggleOpen = !this.itemData.toggleOpen
      },
      changeActive (d) {
        this.$emit('change-active', d)
        this.itemData.toggleOpen = !this.itemData.toggleOpen
      }
    }
  }
</script>

<style scoped>

</style>
