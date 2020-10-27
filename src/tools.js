export default {
  // 数组转为字符串
  arrayToStr: function(array, join) {
    let str = ''
    if (array !== undefined && array.length > 0) {
      array.map(item => {
        str += item + join
      })
    }
    if (str.length > 0) {
      str = str.substr(0, str.length - 1)
    }
    return str
  }
}
