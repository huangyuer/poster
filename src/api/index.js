import api from "./api.json";
import notice from "./notice.json";
import param from "./param.json";
import user from "./user.json";
import role from "./role.json";
import sasPassport from "./sasPassport.json";
import billDirBsc from "./billDirBsc.json";
import org from "./org.json";
import bondInvt from "./bondInvt.json";
import tool from "./tool.json";
import authority from "./authority.json";
import backLog from "./backLog.json";
import wareHouse from "./wareHouse.json";
import creditCardReceipt from "./CreditCardReceipt.json";
import importBonded from "./ImportBonded.json";
import baseGood from "./BaseGood.json";
import stockBill from "./stockBill.json";
import portRelease from "./portRelease.json";
import pickRide from "./pickRide.json";
import businesssDeclar from "./BusinessDeclarFrom.json";

import Material from "./Material.json";
import otherApi from "./otherApi.json";
import draw from "./draw.json";
import Guarantee from "./Guarantee.json";
import tradeQualify from "./tradeQualify.json";
let arr = {
  timeout: 45,
  sign: true,
  post: {
    ...api["post"],
    ...notice["post"],
    ...param["post"],
    ...user["post"],
    ...role["post"],
    ...sasPassport["post"],
    ...billDirBsc["post"],
    ...org["post"],
    ...bondInvt["post"],
    ...tool["post"],
    ...authority["post"],
    ...backLog["post"],
    ...wareHouse["post"],
    ...importBonded["post"],
    ...creditCardReceipt["post"],
    ...baseGood["post"],
    ...otherApi["post"],
    ...draw["post"],
    ...otherApi["post"],
    ...stockBill["post"],
    ...portRelease["post"],
    ...Guarantee["post"],
    ...pickRide["post"],
    ...Material["post"],
    ...businesssDeclar["post"],
    ...tradeQualify["post"],
  },
  get: {
    ...api["get"],
    ...notice["get"],
    ...param["get"],
    ...user["get"],
    ...role["get"],
    ...sasPassport["get"],
    ...billDirBsc["get"],
    ...org["get"],
    ...bondInvt["get"],
    ...tool["get"],
    ...authority["get"],
    ...backLog["get"],
    ...wareHouse["get"],
    ...importBonded["get"],
    ...creditCardReceipt["get"],
    ...baseGood["get"],
    ...otherApi["get"],
    ...draw["get"],
    ...otherApi["get"],
    ...stockBill["get"],
    ...portRelease["get"],
    ...Guarantee["get"],
    ...Material["get"],
    ...businesssDeclar["get"],
    ...tradeQualify["get"],
  },

  async: {
    queryOrganization: {
      method: "post",
      url: "/org/getOrgList",
    },
    queryEnterprise: {
      method: "post",
      url: "/org/getTradeList",
    },
  },
  jsonp: [
    "http://cloud.easipass.com/EpNewsgator/epnewsgator/fetchjsonnewsdata",
    "http://wthrcdn.etouch.cn/weather_mini?citykey=101020100",
    "http://cloud.easipass.com/EpNewsgator/epnewsgator/fetchsinglejsonnewsdata",
  ],
};
export default arr;
