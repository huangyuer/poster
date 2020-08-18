// Old ECS 迁移方法

/**
 * 提单状态
 * @param {Object} status
 * @return {TypeName} 
 */
export function messageBillStatus(status) {
  var statusText = '';
  if (status == 10) {
    statusText = "未生成账单";
  } else if (status == 20) {
    statusText = "已生成账单";
  } else if (status == 30) {
    statusText = "已支付";
  } else if (status == 31) {
    statusText = "确定退款";
  } else if (status == 32) {
    statusText = "确定收款";
  } else if (status == 40) {
    statusText = "已收款";
  } else if (status == 50) {
    statusText = "已退款";
  } else if (status == 60) {
    statusText = "部分支付";
  } else {
    statusText = status;
  }
  return statusText;
}


/**
 * 支付返回状态
 * @param {Object} rtnCode
 * @return {TypeName} 
 */
export function rtnCodeFormatter(rtnCode) {
  var rtnCodeText = '';
  if (rtnCode == '000000') {
    rtnCodeText = "正常回执";
  } else if (rtnCode == '') {
    rtnCodeText = "错误回执";
  } else if (rtnCode == null) {
    rtnCodeText = "等待回执";
  } else {
    rtnCodeText = rtnCode;
  }
  return rtnCodeText;
}

/**
 * 账单状态
 * @param {Object} status
 * @return {TypeName} 
 */
export function payOrderStatus(status) {
  var statusText = '';
  if (status == 10) {
    statusText = "未付款";
  } else if (status == 20) {
    statusText = "部分支付";
  } else if (status == 30) {
    statusText = "全部支付";
  } else {
    statusText = status;
  }
  return statusText;
}


/**
 * 支付订单状态
 * @param {Object} status
 * @return {TypeName} 
 */
export function payBillStatus(status) {
  var statusText = '';
  if (status == 10) {
    statusText = "待支付";
  } else if (status == 20) {
    statusText = "确认支付";
  } else if (status == 30) {
    statusText = "已支付";
  } else if (status == 31) {
    statusText = "确定退款";
  } else if (status == 32) {
    statusText = "确定收款";
  } else if (status == 40) {
    statusText = "已收款";
  } else if (status == 50) {
    statusText = "已退款";
  } else {
    statusText = status;
  }
  return statusText;
}

/**
 * 进出口标志
 * @param {Object} flag
 */
export function ieFlagText(flag) {
  var flagText = '';
  if (flag == 'ID') {
    flagText = "进口";
  } else if (flag == 'ED') {
    flagText = "出口";
  } else if (flag == 'IC') {
    flagText = "进口放箱";
  } else if (flag == 'EC') {
    flagText = "进口放箱";
  } else {
    flagText = flag;
  }
  return flagText;
}

export function payType(t) {
  var payText = '';
  if (t == '1302') {
    payText = '在线支付';
  } else if (t == '1305') {
    payText = '直通支付';
  } else if (t == '1304') {
    payText = '外币支付';
  } else {
    payText = t;
  }
  return payText;
}

export function JS_getPaymentCode(t) {
  if (t == '1302') {
    return '快捷支付';
  } else if (t == '1312') {
    return '网银支付';
  } else if (t == '1604') {
    return '预存支付';
  } else if (t == '1305') {
    return '直通快捷支付';
  } else if (t == '1606') {
    return '直通预存支付';
  } else if (t == '1315') {
    return '直通网银支付';
  } else if (t == '1304') {
    return '外币支付';
  } else return t;
}

export function JS_getRcStatusLabel(t) {
  if (t == '0')
    return '充值成功';
  else if (t == '1') {
    return '充值失败';
  } else if (t == '2') {
    return '待处理';
  } else if (t == '3') {
    return '待确认充值';
  }
}

export function billCenter_status(t) {
  if (t == '0')
    return '全部';
  else if (t == '10') {
    return '未付款';
  } else if (t == '20') {
    return '部分支付';
  } else if (t == '30') {
    return '全部支付';
  }
}

function isNull(obj) {
  if (obj == null || obj == "" || obj == "undefined") {
    return true;
  } else {
    return false;
  }
}

/**
 * 押箱标示
 */
export function devanningFormatter(t) {
  if (t === "Y") {
    return "是"
  } else {
    return "否"
  }
}

/**
 * 修改标示
 */
export function updateFlagFormatter(updateFlag) {
  if (updateFlag === 0) {
    return '原始';
  } else if (updateFlag === 1) {
    return '追加';
  } else {
    return updateFlag;
  }
}

/**
 * 根据状态返回金额
 */
export function formatByStatus(column) {
  let s = column.payBill.status
  if (s === 10) {
    return column.payBill.currency == column.payBill.payableCurr ? column.payBill.payableAmount : column.payBill.payableRmb
  } else if (s === 20 || s === 30 || s === 31 || s === 32) {
    return column.payBill.paidAmount
  } else if (s === 50) {
    return column.payBill.refundAmount
  } else if (s === 40) {
    return column.payBill.receivedAmount
  } else {
    return ''
  }
}

/**
 * 业务Vue中状态
 */
export function statusFormatter(status) {
  if (status === 20) {
    return "待支付"
  } else if (status === 30 || status === 40 || status === 31 || status === 32) {
    return "已支付"
  } else if (status === 50) {
    return "已退款"
  } else if (status === 60) {
    return "部分支付"
  } else {
    return status
  }
}
export function detailStatusFormatter(status) {
  if (status === 10) {
    return "待支付"
  } else if (status === 30 || status === 40 || status === 20 || status === 31 || status === 32) {
    return "已支付"
  } else if (status === 50) {
    return "已退款"
  } else {
    return status
  }
}

/**
 * commPay4payee
 */
export function commStatusFormatter(status) {
  if (status === 40) {
    return "已实收"
  } else if (status === 30 || status === 31 || status === 32) {
    return "已支付"
  } else if (status === 50) {
    return "已实退"
  } else {
    return status
  }
}

/**
 * payedBill
 */

export function payedBillStatusFormatter(status) {
  if (status === 10) {
    return "对账中"
  } else if (status === 20) {
    return "无差异"
  } else if (status === 30) {
    return "有差异"
  } else if (status === 40) {
    return "人工调平"
  } else {
    return status
  }
}
export function payedBillCheckSheetTypeFormatter(type) {
  if (type === 10) {
    return "报文对账"
  } else if (type === 20) {
    return "手工对账"
  } else {
    return type
  }
}

/**
 * diffTreat
 */

export function tradeType(tradeType) {
  if (tradeType === "1202") {
    return "预存"
  } else if (tradeType === "1301") {
    return "代扣代付"
  } else if (tradeType === "1302") {
    return "支付"
  } else if (tradeType === "1303") {
    return "预约支付"
  } else if (tradeType === "1308") {
    return "收款"
  } else if (tradeType === "1306") {
    return "退款"
  } else if (tradeType === "1401") {
    return "对账"
  } else if (tradeType === "1305") {
    return "直通支付"
  } else if (tradeType === "1304") {
    return "外币支付"
  } else {
    return tradeType
  }
}
export function diffType(diffType) {
  if (diffType === "1") {
    return "遗漏交易"
  } else if (diffType === "2") {
    return "多余交易"
  } else if (diffType === "3") {
    return "交易差异"
  } else if (diffType === "4") {
    return "订单差异"
  } else {
    return diffType
  }
}

export function RechargeType(rechargeType) {
  if (rechargeType === 'ECS_PAY_FEE_0001') {
    return '进口换单使用费'
  } else if (rechargeType === 'ECS_PAY_FEE_0002') {
    return '其他使用费'
  } else {
    return rechargeType
  }
}

/**
 * 格式化数字,#,###.00
 */
export function formatNumber(number, pattern) {

  if (isNull(number)) {
    number = 0;
  }

  if (isNull(pattern)) {
    pattern = '#,###.00';
  }

  var lesszero = false;
  if (number < 0) {
    number = -1 * number;
    lesszero = true;
  }
  var str = number.toString();
  var strInt;
  var strFloat;
  var formatInt;
  var formatFloat;
  if (/\./g.test(pattern)) {
    formatInt = pattern.split('.')[0];
    formatFloat = pattern.split('.')[1];
  } else {
    formatInt = pattern;
    formatFloat = null;
  }

  if (/\./g.test(str)) {
    if (formatFloat != null) {
      var tempFloat = Math.round(parseFloat('0.' + str.split('.')[1]) * Math.pow(10, formatFloat.length)) / Math.pow(10, formatFloat.length);
      strInt = (Math.floor(number) + Math.floor(tempFloat)).toString();
      strFloat = /\./g.test(tempFloat.toString()) ? tempFloat.toString().split('.')[1] : '0';
    } else {
      strInt = Math.round(number).toString();
      strFloat = '0';
    }
  } else {
    strInt = str;
    strFloat = '0';
  }
  if (formatInt != null) {
    var outputInt = '';
    var zero = formatInt.match(/0*$/)[0].length;
    var comma = null;
    if (/,/g.test(formatInt)) {
      comma = formatInt.match(/,[^,]*/)[0].length - 1;
    }
    var newReg = new RegExp('(\\d{' + comma + '})', 'g');

    if (strInt.length < zero) {
      outputInt = new Array(zero + 1).join('0') + strInt;
      outputInt = outputInt.substr(outputInt.length - zero, zero)
    } else {
      outputInt = strInt;
    }

    var
      outputInt = outputInt.substr(0, outputInt.length % comma) + outputInt.substring(outputInt.length % comma).replace(newReg, (comma != null ? ',' : '') + '$1')
    outputInt = outputInt.replace(/^,/, '');

    strInt = outputInt;
  }

  if (formatFloat != null) {
    var outputFloat = '';
    var zero = formatFloat.match(/^0*/)[0].length;

    if (strFloat.length < zero) {
      outputFloat = strFloat + new Array(zero + 1).join('0');
      //outputFloat        = outputFloat.substring(0,formatFloat.length);
      var outputFloat1 = outputFloat.substring(0, zero);
      var outputFloat2 = outputFloat.substring(zero, formatFloat.length);
      outputFloat = outputFloat1 + outputFloat2.replace(/0*$/, '');
    } else {
      outputFloat = strFloat.substring(0, formatFloat.length);
    }

    strFloat = outputFloat;
  } else {
    if (pattern != '' || (pattern == '' && strFloat == '0')) {
      strFloat = '';
    }
  }

  var result = strInt + (strFloat == '' ? '' : '.' + strFloat);
  if (lesszero) {
    result = '-' + result;
  }
  return result;
}



/**
 * 出入库单类型
 * @param {Object} flag
 */
export function ieInventoryStatus(flag) {
  let flagText = '';
  if (flag == 'I') {
    flagText = "I-进区";
  } else if (flag == 'E') {
    flagText = "E-出区";
  } else {
    flagText = flag;
  }
  return flagText;
}

/**
 * 业务类型
 * @param {Object} flag
 */
export function businessType(flag) {
  let flagText = '';
  if (flag == "A") {
    flagText = "A-分送集报";
  } else if (flag == "B") {
    flagText = "B-外发加工";
  } else if (flag == "C") {
    flagText = "C-保税展示交易";
  } else if (flag == "D") {
    flagText = "D-设备检测";
  } else if (flag == "E") {
    flagText = "E-设备维修";
  } else if (flag == "F") {
    flagText = "F-模具外发";
  } else if (flag == "G") {
    flagText = "G-简单加工";
  } else if (flag == "H") {
    flagText = "H-其他业务";
  } else {
    flagText = flag;
  }
  return flagText;
}
