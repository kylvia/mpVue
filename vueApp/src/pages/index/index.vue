<template>
  <div @click="clickHandle">
    <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">huoqu</button>
    <scroll-view scroll-y="true" lower-threshold="100" @touchend="fun_touchend" @scrolltolower="loadMore" class="list-box" style="height: 400px">
      <div class="list" v-for="(item,index) in list" :key="index">
        {{item.name}}<img :src="item.headImg" alt="">
      </div>
      <div v-if="loading" class="loadmore">
        <div class="loading"></div>
        <div class="loadmore__tips">正在加载</div>
      </div>
      <div v-if="!list.length" class="loadmore loadmore_line">
        <div class="loadmore__tips loadmore__tips_in-line">暂无数据</div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import card from '@/components/card'
import API from '@/utils/api'

export default {
  data () {
    return {
      time: '12:01',
      motto: 'Hello miniprograme',
      touchend: false,
      cur_page: 1,
      loading: false,
      trees: [],
      list: [],
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },

  components: {
    card
  },

  methods: {
    fun_touchend () {
      console.log('fun_touchend')
      this.touchend = false
    },
    loadMore () {
      const _this = this
      this.loading = true
      if (this.touchend) {
        return
      }
      if (this.cur_page !== 1) {
        this.touchend = true
      }
      this.$httpWX.POST(API.getList, {cur_page: this.cur_page}).then(res => {
        setTimeout(() => {
          _this.loading = false
          _this.list = this.list.concat(res.jData.data)
          _this.cur_page++
        }, 3000)
      })
    },
    TimeChange (e) {
      console.log('选中的时间为：' + e.mp.detail.value)
      this.time = e.mp.detail.value
    },
    getPhoneNumber (e) {
      console.log(e.detail.errMsg)
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
    },
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  onLoad () {
    // let app = getApp()
    this.$httpWX.POST(API.getTree, {}).then(res => {
      console.log(res.jData)
      this.trees = res.jData
    })
    // this.$httpWX.POST(API.getList, {}).then(res => {
    //   console.log(res.jData)
    //   this.list = res.jData.data
    // })
  }
}
</script>

<style scoped>

  .loading {
    margin: 0 5px;
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    -webkit-animation: a 1s steps(12) infinite;
    animation: a 1s steps(12) infinite;
    background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
    background-size: 100%;
  }

  .loadmore__tips {
    display: inline-block;
    vertical-align: middle;
  }


  .loadmore {
    width: 65%;
    margin: 1.5em auto;
    line-height: 1.6em;
    font-size: 14px;
    text-align: center;
  }

  .loadmore__tips {
    display: inline-block;
    vertical-align: middle;
  }

  .loadmore_line {
    border-top: 1px solid #e5e5e5;
    margin-top: 2.4em;
  }

  .loadmore__tips_in-line {
    position: relative;
    top: -.9em;
    padding: 0 0.55em;
    background-color: #fff;
    color: #999;
  }
  .list-box{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  }
  .list{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5px 0;
  }
  .list + .list{
    border-top: 1px dashed #ddd;
  }
  .list img{
    width: 40px;
    height: 40px;
  }
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
