/**
 * 日期工具类封装方法
 * @author: Merjiezo
 * @since: 2017-05-26
 */
import fecha from 'fecha'
export const previousDate = function (date, format) {
  let timeStep = isNaN(+date) ?
    new Date().getTime() :
    new Date().getTime() - 1000 * 3600 * 24 * date
  return fecha.format(timeStep, format || 'YYYY-MM-DD')
}

export const previousRangeDate = function (date, format) {
  return previousDate(date, format) + ',' + fecha.format(new Date(), format || 'YYYY-MM-DD')
}
export const today = function () {
  var tempDate = new Date();
  var year = tempDate.getFullYear();
  var month = tempDate.getMonth() + 1;
  var day = tempDate.getDate();
  return year + "-" + month + "-" + day
}
// 根据当前时间判断要返回的  开始日期和结束日期
export const getData = function (data) {
  const date = today().split('-')
  let sumBeginTime
  let sumDueTime
  if (date[1] == 1) {
    sumBeginTime = (+date[0] - 1) + date[1] + '-25 00:00:00'
    sumDueTime = date[0] + '-0' + date[1] + '-24 23:59:59'
  } else if (date[1] == 12) {
    sumBeginTime = date[0] + '-' + date[1] + '-25 00:00:00'
    sumDueTime = (+date[0] + 1) + '-01-24 23:59:59'
  } else {
    sumBeginTime = date[0] + '-0' + (+date[1] - 1) + '-25 00:00:00'
    sumDueTime = date[0] + '-0' + date[1] + '-24 23:59:59'
  }
  return {
    sumBeginTime,
    sumDueTime
  }
}
