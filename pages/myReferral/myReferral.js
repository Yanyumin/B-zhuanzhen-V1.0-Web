// pages/myReferral/myReferral.js
const { request, baseURL } = require("../../utils/request")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: '',
    tabChange: 0,
    pageSize: 10,
    pageCurrent: 1,
    list1: [],
    isOver1: false, // list1从接口获取到的数据如果小于10条则代表没有下一页，此时为true
  },
  tabTap (e) {
    let {tabs} = e.currentTarget.dataset
    this.setData({
      tabChange: tabs
    })
  },
  // 获取列表数据
  getListData1 () {
    let that = this
    let list1 = that.data.list1
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    request({
      url: 'ReferralPlatform/TheCheckReferralList?pageSize=' + that.data.pageSize + '&pageIndex=' + that.data.pageCurrent,
      method: 'POST',
    }).then(res => {
      if (res.statusCode === 200) {
        if (res.data.resultCode == 1) {
          // 返回的数据条数小于请求的条数，则是最后一页，触底不再请求
          if (res.data.rows.length < that.data.pageSize) {
            this.setData({
              isOver1: true
            })
          }
          Array.prototype.push.apply(list1, res.data.rows);
          this.setData({
            list1
          })
        } else {
          wx.showToast({
            title: res.data.message || '数据获取失败',
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        
      }
      wx.hideLoading()
      wx.hideNavigationBarLoading(); //完成停止加载图标
      wx.stopPullDownRefresh();
    })
  },
  goViewDetail (e) {
    let {id , type} = e.currentTarget.dataset
    wx.navigateTo({
      url: '../referralDetail/referralDetail?id=' + id + '&type=' + type,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      winHeight: wx.getSystemInfoSync().windowHeight
    })
    this.getListData1()
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
    this.setData({
      pageSize: 10,
      pageCurrent: 1,
      list1: [],
      isOver1: false
    })
    this.getListData1()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageSize: 10,
      pageCurrent: this.data.pageCurrent + 1
    })
    if (!this.data.isOver1) {
      this.getListData1()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})