// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '温馨提示'
    },
    content: {
      type: String,
      value: '您还没有权限，请联系管理员开通'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isOut: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dialogTap () {
      this.setData({
        isOut: true
      })
      this.triggerEvent('dialogTap');
    }
  }
})
