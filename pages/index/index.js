//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    height: '',
    imgUrls: [
      '../../imgs/swiper.jpg'
    ]
  },
  onLoad: function () {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight
    })
  },
})
