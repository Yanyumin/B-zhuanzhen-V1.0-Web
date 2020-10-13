// pages/referralDetail/referralDetail.js
const { request, baseURL } = require("../../utils/request")
const {formateInputTime} = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    referralType: '',
    detailData: {},
    historyPics: [],
    partClumn: ['ceshi'],
    // 转发
    replyDepartment: '',
    replyDoc: '',
    // 驳回
    returnOpinion: '',
    // 审核
    passOpinion: '',
    // 弹窗显示隐藏
    showPopBox: false,
    // 弹窗显示类型，1=转发 2=转诊 3=驳回
    showPopType: 1,
    styleTop: '40%',
    // 自己处理的转发
    departmentNames: [],
    departmentDatas: [],
  },
  // 获取详情
  getDetailData () {
    let that = this
    let detailData = that.data.detailData
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    request({
      url: 'ReferralPlatform/CheckReferralDetails?orderid=' + that.data.id,
      method: 'POST',
    }).then(res => {
      if (res.statusCode === 200) {
        if (res.data.resultCode == 1) {
          detailData = res.data.row
          detailData.recCreateDt = formateInputTime(detailData.recCreateDt)
          let historyPics = that.data.historyPics
          historyPics = detailData.pics ? detailData.pics.split(',') : []
          this.setData({
            detailData,
            historyPics
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
    })
  },
  // 病历资料图片预览
  historyShowImg: function (e) {
    var that = this;
    wx.previewImage({
        urls: that.data.historyPics,
        current: that.data.historyPics[e.currentTarget.dataset.index]
    })
  },
  // 获取科室列表信息
  getDepartmentList () {
    let that = this
    let departmentNames = that.data.departmentNames
    departmentNames = []
    request({
      url: 'ReferralPlatform/ReferralDepartment',
      method: 'POST'
    }).then(res => {
      if (res.statusCode === 200) {
        if (res.data.resultCode == 1) {
          let resultData = res.data.data
          resultData.forEach(item => {
            departmentNames.push(item.name)
          })
          that.setData({
            departmentDatas: resultData,
            departmentNames
          })
        } else {
          wx.showToast({
            title: res.data.message || '科室信息获取失败',
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: '科室信息获取失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 转诊
  passTap () {
    this.setData({
      showPopType: 2,
      showPopBox: true
    })
  },
  passHandle () {
    if (!this.data.passOpinion) {
      wx.showToast({
        title: '请输入转诊意见',
        icon: 'none',
        duration: 2000
      })
      return
    }
  },
  // 驳回
  returnTap () {
    this.setData({
      showPopType: 3,
      showPopBox: true
    })
  },
  returnHandle () {
    if (!this.data.returnOpinion) {
      wx.showToast({
        title: '请输入驳回意见',
        icon: 'none',
        duration: 2000
      })
      return
    }
  },
  // 转发
  replyTap () {
    this.setData({
      showPopType: 1,
      showPopBox: true
    })
  },
  replyHandle () {
    if (!this.data.replyDepartment) {
      wx.showToast({
        title: '请选择转发科室',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!this.data.replyDoc) {
      wx.showToast({
        title: '请选择转发医生',
        icon: 'none',
        duration: 2000
      })
      return
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      referralType: options.type || 1,
      status: options.status
    })
    this.getDetailData()
    // 如果是我接收的
    if (options.type == 2) {
      this.getDepartmentList()
    }
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

  },
  onPageScroll: function (e) {
    let _this = this
    wx.createSelectorQuery().select('.detailContainer').boundingClientRect(function (rect) {
      console.log(e)
      console.log(rect)
        if (e.scrollTop > 0) {
            //已离底部一段距离，下面处理操作
            _this.setData({
              styleTop: -(rect.top) + 250 + 'px' 
            })
        }
    }).exec()
}
})