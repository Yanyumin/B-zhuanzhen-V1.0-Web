/* 用 promise 方式封装 request 请求方法 */

// function request(params) {
//  
// }
// 定义 request 函数，专门用于化简 request
const baseURL = 'https://api.gdbkyz.com/test/BitcareMR/api/'
const request = (params) => {
// 通过 Promise 对象，把请求成功和失败的回调函数进行封装
return new Promise((resolve, reject) => {
  // 2.0 发送请求
  wx.request({
    // 直接把所有的参数解构
    ...params,
    // 2.1 !! url 请求地址 = 基本路径 + 传入的 url
    url: baseURL + params.url,
    header: {
        'cookie': wx.getStorageSync('cookies'),
        'content-type': 'application/json' // 默认值
    },
    // 2.2 请求成功的回调函数
    success: res => {
      // 解构返回结果
      // const {
      //   message
      // } = res.data;
      // 请求成功，执行 Promise 的 resolve 回调函数
      resolve(res);
    },
    fail: err => {
      reject(err);
    },
    // 请求完成的时候
    complete: res => {
      // 3.0 隐藏加载框
      wx.hideLoading();
    }
  })
});
}
// 把封装的方法导出
module.exports = {
request,
baseURL
}
