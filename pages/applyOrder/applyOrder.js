// pages/applyOrder/applyOrder.js
const { request, baseURL } = require("../../utils/request")
const { checkIDCard } = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '110rpx',
    winHeight: '',
    isSuccess: false,
    logoFlag: true,
    zhuanzhenType: [
      {
        name: '上转诊',
        checked: false
      },
      {
        name: '下转诊',
        checked: false
      }
    ],
    HospClumn: ['yiyuan', 'eryuan'],
    partClumn: ['yiyuan', 'eryuan'],
    service: [{
      checked: false,
      name: '我同意'
    }],
    serviceValue: '',
    // 页面填写基本信息
    patientName: '',
    idNumber: '',
    phone: '',
    cardNum: '',
    connectAddress: '',
    historyPics: [],
    zhuanzhenSelect: '',
    zhuanzhenHospName: '',
    applyPartName: '',
    applyDepartName: '',
    applyDoc: '',
    applyPhone: '',
    applyMan: ''
  },
  patientNameChange (e) {
    this.setData({
      patientName: e.detail.value
    })
  },
  idNumberChange (e) {
    this.setData({
      idNumber: e.detail.value
    })
  },
  phoneChange (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  cardNumChange (e) {
    this.setData({
      cardNum: e.detail.value
    })
  },
  applyDepartNameChange (e) {
    this.setData({
      applyDepartName: e.detail.value
    })
  },
  applyDocChange (e) {
    this.setData({
      applyDoc: e.detail.value
    })
  },
  applyPhoneChange (e) {
    this.setData({
      applyPhone: e.detail.value
    })
  },
  applyManChange (e) {
    this.setData({
      applyMan: e.detail.value
    })
  },
  // 协议选择
  serviceChange (e) {
    console.log(e)
    this.setData({
      serviceValue: e.detail.value
    })
  },
  serviceRadioTap (e) {
    let servise = this.data.service
    servise[0].checked = !(servise[0].checked);
    if (servise[0].checked == false) {
      this.data.serviceValue = ''
    }
    console.log(servise)
    this.setData({
      servise
    });
  },
  // 联系地址输入值
  connectAddressInput (e) {
    this.setData({
      connectAddress: e.detail.value
    })
  },
  // 联系地址输入超过三行让父盒子高度发生改变从而让父盒子有空隙
  lineChange (e) {
    console.log(e.detail.lineCount)
    if (e.detail.lineCount > 3) {
      this.getTargetHeight()
    }
  },
  // 病历资料图片上传
  uploadHistoryPic () {
    let that = this
    if (that.data.logoFlag) {
      that.setData({
        logoFlag: false
      })
      let historyPics = that.data.historyPics
      wx.chooseImage({
          count: 4, // 默认1
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              console.log(res)
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              let tempFilePaths = res.tempFilePaths;
              for (let i in tempFilePaths) {
                wx.uploadFile({
                  method: "POST",
                  url: baseURL + 'ImgFile/SaveImages',
                  filePath: tempFilePaths[i],
                  name: 'file',
                  success: function (res) {
                    let data = JSON.parse(res.data)
                    if (res.statusCode == 200) {
                      historyPics.push(data.ResultMsg)
                      that.setData({
                        logoFlag: true,
                        historyPics
                      })
                      if (i == tempFilePaths.length - 1) {
                        wx.showToast({
                          title: '图片上传成功',
                          icon: 'success'
                        })
                      }
                    }
                  },
                  fail: function () {
                    wx.showToast({
                      title: '图片上传失败,请重新上传',
                      icon: 'none',
                      success: function () {
                        that.setData({
                          logoFlag: true
                        })
                      }
                    })
                  },
                })
              }
          },
          fail: function() {
              that.setData({
                  logoFlag: true
              })
          },
      })
    }
  },
  // 病历资料图片预览
  historyShowImg: function (e) {
    var that = this;
    wx.previewImage({
        urls: that.data.historyPics,
        current: that.data.historyPics[e.currentTarget.dataset.index]
    })
  },
  // 病历资料图片删除
  historyDelete: function (e) {
    var that = this;
    let historyPics = that.data.historyPics
    let index = e.currentTarget.dataset.index
    historyPics.splice(index, 1)
    that.setData({
      historyPics
    })
  },
  
  hospBindChange (e) {
    this.setData({
      zhuanzhenHospName: this.data.HospClumn[e.detail.value]
    })
  },
  partBindChange (e) {
    this.setData({
      applyPartName: this.data.partClumn[e.detail.value]
    })
  },
  zhuanzhenTypeChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const zhuanzhenType = this.data.zhuanzhenType
    for (let i = 0, len = zhuanzhenType.length; i < len; ++i) {
      zhuanzhenType[i].checked = zhuanzhenType[i].name === e.detail.value
    }

    this.setData({
      zhuanzhenType,
      zhuanzhenSelect: e.detail.value
    })
  },
  submitForm () {
    let that = this
    if(!that.data.serviceValue) {
      return
    }
    if (!that.data.patientName) {
      wx.showToast({
        title: '患者姓名未填写',
        icon: 'none',
        duration: 2000
      })
      return
    }else if (!that.data.idNumber) {
      wx.showToast({
        title: '患者省份证未填写',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!checkIDCard(that.data.idNumber)) {
      wx.showToast({
        title: '患者省份证格式有误，请重新填写',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!that.data.phone) {
      wx.showToast({
        title: '患者联系电话未填写',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!(/^1[3456789]\d{9}$/.test(this.data.phone))){
      wx.showToast({
        title: '患者联系电话格式有误，请重新填写',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!that.data.cardNum) {
      wx.showToast({
        title: '省妇幼就诊卡未填写',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!that.data.connectAddress) {
      wx.showToast({
        title: '患者联系地址未填写',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (that.data.historyPics.length == 0) {
      wx.showToast({
        title: '患者病历资料未上传',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!that.data.zhuanzhenSelect) {
      wx.showToast({
        title: '上下转诊未选择',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!that.data.zhuanzhenHospName) {
      wx.showToast({
        title: '转诊医院未选择',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!that.data.applyPartName) {
      wx.showToast({
        title: '申请单位名称未选择',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!that.data.applyDepartName) {
      wx.showToast({
        title: '申请科室未填写',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!that.data.applyDoc) {
      wx.showToast({
        title: '申请医生未填写',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!that.data.applyPhone) {
      wx.showToast({
        title: '申请单位联系电话未填写',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!(/^1[3456789]\d{9}$/.test(this.data.applyPhone))) {
      wx.showToast({
        title: '申请单位联系电话格式有误，请重新填写',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (!that.data.applyMan) {
      wx.showToast({
        title: '申请单位发起人未填写',
        icon: 'none',
        duration: 2000
      })
      return
    }
  },
  // 动态设置元素的高度
  getTargetHeight () {
    //创建节点选择器
    var query = wx.createSelectorQuery();	// 创建节点查询器 query
    //选择id
    var that = this; // 获取this
    // 这段代码的意思是选择class=every的节点，获取节点位置信息的查询请求
    query.select('.textCon').boundingClientRect(function (res) {
      that.setData({
        height: Number(res.height+ 30) + 'px' // 赋值操作
      })
    }).exec();
    query.selectViewport().scrollOffset().exec()//这段代码的意思是获取页面滑动位置的查询请求
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      winHeight: wx.getSystemInfoSync().windowHeight
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