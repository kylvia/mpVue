import API from './api.js'

function request (url, params) {
  if (params.showLoading) {
    wx.showLoading({
      title: '加载中' // 数据请求前loading
    })
  }
  return new Promise((resolve, reject) => {
    console.log(API.URL + url)
    wx.request({
      url: API.URL + url,
      method: params.method,
      data: params.data,
      headers: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // success
        if (res.statusCode !== 200) {
          wx.showToast({
            title: '网络出错，稍后再试',
            icon: 'none'
          })
          return false
        }
        resolve(res.data)
      },
      fail: function (res) {
        // reject(false)
      },
      complete: function () {
        params.showLoading && wx.hideLoading()
      }
    })
  })
}
function GET (url, params) {
  return request(url, { method: 'GET', ...params })
}
function POST (url, params) {
  return request(url, { method: 'POST', ...params })
}
export default {
  GET,
  POST
}
