export default {
  // 数组转为字符串
  arrayToStr: function(array, join) {
    let str = ''
    if (array !== undefined && array != null && array.length > 0) {
      array.map(item => {
        str += item + join
      })
    }
    if (str.length > 0) {
      str = str.substr(0, str.length - 1)
    }
    return str
  },
  // 校验邮箱
  checkEmail: function(rule, value, cb) {
    // 验证邮箱的正则表达式
    const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

    if (regEmail.test(value)) {
      // 合法的邮箱
      return cb()
    }

    cb(new Error('请输入合法的邮箱'))
  },
  // 校验手机号码
  checkMobile: function(rule, value, cb) {
    // 验证手机号的正则表达式
    const regMobile = /^1[0-9]\d{9}$/

    if (regMobile.test(value)) {
      return cb()
    }

    cb(new Error('请输入合法的手机号'))
  }
}
