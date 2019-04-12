<template>
  <div>
      <ul class="tree-list">
        <tree v-for="item in dlist" v-bind:key="item.id" v-bind:item-data="item"></tree>
      </ul>

    <ul class="container log-list">
      <li v-for="(log, index) in logs" :class="{ red: aa }" :key="index" class="log-item">
        <card :text="(index + 1) + ' . ' + log"></card>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'
import API from '@/utils/api'
import tree from '@/components/tree'

export default {
  components: {
    card,
    tree
  },

  data () {
    return {
      logs: [],
      dlist: [],
      imgUrls: [
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d',
        'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870'
      ]
    }
  },

  created () {
    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
    } else {
      logs = mpvue.getStorageSync('logs') || []
    }
    this.logs = logs.map(log => formatTime(new Date(log)))

    this.$httpWX.POST(API.getTree, {}).then(res => {
      console.log(res.jData)
      this.dlist = res.jData
    })
  },
  methods: {
    changeActive (d) {
      if (d.active) return
      this.departmentId = d.id
      this.resetActive(this.dlist)
      d.active = true
    },
    resetActive (dlist) {
      const _this = this
      dlist.map(item => {
        item.active = false
        item.child && _this.resetActive(item.child)
      })
    }
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
