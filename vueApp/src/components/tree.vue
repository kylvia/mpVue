<template>
  <ul>
    <li v-for="(item, index) in treeData" :key="index" @click="changeToggleOpen($event,index)" :id="item.preLevel" v-if="item.open || item.toggleOpen">
      <span :class="[item.nodeId, {'hide': !item.toggleOpen}]" :style="item.pleft">{{item.name}}</span>
    </li>
  </ul>
    <!--<li class="item" ref="item">
      <div class="bold" v-bind:class="{'item-active':itemData.active}">
        <div class="icon-pencil" :class="{'icon-quill':!itemData.toggleOpen && itemData.child, 'fa-caret-down':itemData.toggleOpen && itemData.child}"
             @click.self.prevent="changeToggleOpen()"></div>
        <span class="item-name" @click="changeActive(itemData)">
          <i class="icon-home"></i>
          {{ itemData.name }}
        </span>
      </div>
      <tree-item v-if="itemData.child" v-show="itemData.toggleOpen" v-for="(item, index) in itemData.child" :key="index" :children="item" @change-active="changeActive($event)"></tree-item>
    </li>-->
</template>

<script>
  export default {
    name: 'tree',
    components: {
      // TreeItem
    },
    props: ['itemData'],
    data () {
      return {
        treeData: [],
        pleft: 'padding-left: 0rpx'
      }
    },
    beforeCreate: function () {
      // this.$options.components.TreeItem = require('./tree-item')
    },
    created () {
      console.log('itemData-->', this.itemData)
      this.formatTree(0, 0, this.itemData)
      console.log('treeData-->', this.treeData)
    },
    methods: {
      countLeft () {
        let num = this.$refs.item.length
        this.pleft = `padding-left:${num * 20}rpx`
      },
      changeToggleOpen (e, index) {
        console.log(e)
        this.treeData[index].open = true // 当前节点 展开
        this.treeData[index].toggleOpen = !this.treeData[index].toggleOpen // 控制子节点
        // let hideItems = []
        console.log(this.treeData[index].open)
        this.treeData.map(item => {
          let _preLevel = '' + item.preLevel
          // console.log(_preLevel.indexOf(e.currentTarget.id))
          if (_preLevel.indexOf(e.currentTarget.id) === 0 && _preLevel !== ('' + e.currentTarget.id)) {
            console.log('' + e.currentTarget.id)
            item.toggleOpen = this.treeData[index].toggleOpen
            item.open = this.treeData[index].toggleOpen
          }
        })
        console.log(this.treeData[index].open)
        console.log(this.treeData)
      },
      formatTree (_level, _preLevel, tree) {
        tree.map((item, index) => {
          let {name, id, nodeId = 'node' + item.id, preLevel = !item.pId ? _level : `${_preLevel}-${index}`, level = _level, open = false, toggleOpen, pleft = `padding-left:${_level * 20}rpx`} = item
          this.treeData.push({name, id, nodeId, level, preLevel, open, toggleOpen, pleft})
          if (item.child) {
            this.formatTree(level + 1, preLevel, item.child)
          }
        })
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
