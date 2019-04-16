<template>
  <ul>
    <li v-for="(item, index) in treeData" :key="index" @click="changeToggleOpen($event,index)" :id="item.levelId" v-if="item.open || item.toggleOpen">
      <div :style="item.pleft"><i class="icon" v-if="item.hasChild" :class="item.toggleOpen?'tree-minus':'tree-plus'"></i>{{item.name}}</div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'tree',
    props: ['itemData'],
    data () {
      return {
        treeData: []
      }
    },
    created () {
      this.formatTree(0, 0, this.itemData)
    },
    methods: {
      changeToggleOpen (e, index) {
        this.treeData[index].open = true // 当前节点 展开
        this.treeData[index].toggleOpen = !this.treeData[index].toggleOpen // 控制子节点
        this.treeData.map(item => {
          let _levelId = '' + item.levelId
          if (_levelId.indexOf(e.currentTarget.id) === 0 && _levelId !== ('' + e.currentTarget.id)) {
            item.toggleOpen = this.treeData[index].toggleOpen
            item.open = this.treeData[index].toggleOpen
          }
        })
      },
      formatTree (_level, _levelId, tree) {
        tree.map((item, index) => {
          let {name, id, levelId = !item.pId ? _level : `${_levelId}-${index}`, hasChild = item.child ? !0 : false, level = _level, open = !item.pId ? !0 : false, toggleOpen = false, pleft = `padding-left:${_level * 20}rpx`} = item
          this.treeData.push({name, id, level, levelId, open, hasChild, toggleOpen, pleft})
          if (item.child) {
            this.formatTree(level + 1, levelId, item.child)
          }
        })
      }
    }
  }
</script>

<style scoped>
 .icon{
   display: inline-block;
   margin-right: 3px;
   font-size: 14px;

 }
</style>
