<template>
    <li class="item" ref="item">
      <div class="bold" v-bind:class="{'item-active':itemData.active}">{{1}}
        <div class="icon-pencil" :class="{'icon-quill':!itemData.toggleOpen && itemData.child, 'fa-caret-down':itemData.toggleOpen && itemData.child}"
             @click.self.prevent="changeToggleOpen()"></div>
        <span class="item-name" @click="changeActive(itemData)">
          <i class="icon-home"></i>
          {{ itemData.name }}
        </span>
      </div>
      <tree-item v-if="itemData.child" v-show="itemData.toggleOpen" v-for="(item, index) in itemData.child" :key="index" :children="item" @change-active="changeActive($event)"></tree-item>
    </li>
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
      this.$options.components.TreeItem = require('./tree-item.vue').default
    },
    created () {
      console.log(this.itemData)
    },
    methods: {
      countLeft () {
        let num = this.$refs.item.length
        this.pleft = `padding-left:${num * 20}rpx`
      },
      changeToggleOpen () {
        console.log(111)
        this.itemData.toggleOpen = !this.itemData.toggleOpen
      },
      changeActive (d) {
        console.log(d)
        this.$emit('change-active', d)
        this.itemData.toggleOpen = !this.itemData.toggleOpen
      }
    }
  }
</script>

<style scoped>

</style>
