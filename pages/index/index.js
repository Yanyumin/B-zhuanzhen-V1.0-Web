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
    // const userInfo = wx.getStorageSync('userInfo');
    // if (!userInfo) {
    //   console.log('没有 token 跳转到登录授权页');
    //   wx.redirectTo({
    //     url: '/pages/login/login',
    //   });
    // }
    this.setData({
      height: wx.getSystemInfoSync().windowHeight
    })
  },
})
