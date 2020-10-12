const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const checkIDCard = (idcode) => {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(idcode)
}

// 时间格式化
const formateInputTime =  (n) => {
  var date = n.slice(0, 10)
  var time = n.slice(11, 19)
  var dateTime = date + ' ' + time
  return dateTime
}
module.exports = {
  formatTime: formatTime,
  checkIDCard,
  formateInputTime
}
