// pages/login/login.js
const { request } = require("../../utils/request")
const md5 = require('../../utils/md5.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: '',
    account: '',
    password: '',
    code: ''
  },
  accountChange (e) {
    this.setData({
      account: e.detail.value
    })
  },
  passwordChange (e) {
    this.setData({
      password: e.detail.value
    })
  },
  submitLogin () {
    let that = this
    if (!this.data.account) {
      wx.showToast({
        title: '请输入登录的手机号码',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!(/^1[3456789]\d{9}$/.test(this.data.account))) {
      wx.showToast({
        title: '登录的手机号码格式有误，请重新填写',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!this.data.password) {
      wx.showToast({
        title: '请输入登录密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let md5Password = md5.md5(this.data.password)
    md5Password = md5Password.toLowerCase()
    console.log(md5Password)
    request({
      url: 'Auth/Login',
      method: 'POST',
      data: {
        code: this.data.code,
        account: this.data.account,
        password: md5Password
      }
    }).then(res => {
      if (res.statusCode === 200) {
        if (res.data.resultCode == 1) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
          wx.setStorageSync('userInfo', res.data.row)
          wx.redirectTo({
            url: '../index/index',
          })
        } else {
          wx.showToast({
            title: res.data.message || '登录失败。请重新登录',
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: '登录失败。请重新登录',
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: '登录失败。请重新登录',
        icon: 'none',
        duration: 2000
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      winHeight: wx.getSystemInfoSync().windowHeight
    })
    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            code: res.code
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})