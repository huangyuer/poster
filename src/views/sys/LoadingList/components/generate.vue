[<template>
  <div>
    <ep-model title="装车单管理" v-model="modelFlag" width="1150px" :wrap-close="false">
      <div class="modelFlagbox">
        <div class="product">
          <div class="table">
            <!-- <p style="height:60px;text-align:center;line-height:60px;font-size:25px;">装车单管理</p> -->
            <div style>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:100%;display: inline-block;">
                  装车单单证号 :
                  <a>{{bodyForm.packageListNo}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:100%;display: inline-block;">
                  车牌号 :
                  <a>{{bodyForm.vehicleNo}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:100%;display: inline-block;">
                  关区 :
                  <a>{{customCodeFormatter(bodyForm)}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:100%;display: inline-block;">
                  进出区标志 :
                  <a>{{iePackFormatter(bodyForm)}}</a>
                </span>
              </p>
              <!-- <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:32%;display: inline-block;">
                  类型 :
                  <a>{{bookTypeFormatter(bodyForm)}}</a>
                </span>
              </p>-->
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:100%;display: inline-block;">
                  企业中文名称 :
                  <a>{{bodyForm.tradeName}}</a>
                </span>
              </p>
              <p style="padding: 0 5px;">
                <span style="padding:5px 0 ;width:100%;display: inline-block;">
                  总重量(kg) :
                  <a>{{bodyForm.weight}}</a>
                </span>
              </p>
            </div>
          </div>
          <table style="border:1px solid #666;width:100%;border-collapse: collapse;">
            <tr>
              <td>卡口验放凭证编号</td>
              <td>出入库类型</td>
              <td>车牌号</td>
              <!-- <td>关区</td> -->
              <td>进出区标志</td>
            </tr>
            <tr v-for="(item,index) in Listdata" :key="index">
              <td style="background-color: #fff;">{{item.preentNo}}</td>
              <td style="background-color: #fff;">{{inExpTypeFormatter(item)}}</td>
              <td style="background-color: #fff;" :rowspan="index" v-if="index==0">{{item.vehicleNo}}</td>
              <!-- <td>{{masterCuscdFormatter(item)}}</td> -->
              <td style="background-color: #fff;" :rowspan="index" v-if="index==0">{{ieTypecdFormatter(item)}}</td>

              <!-- <td>{{item.rmk}}</td> -->
            </tr>
          </table>
        </div>

        <div class="addgenerate">
          <ep-form ref="bodyForm" :rules="page_rules" :form="bodyForm" name-width="5px">
            <ep-row :gutter="7">
              <ep-form-item attr="packageListNo" class="icon-active" label>
                <ep-input
                  icon="card"
                  placeholder="装车单单证号"
                  v-model="bodyForm.packageListNo"
                  name="packageListNo"
                  disabled
                ></ep-input>
              </ep-form-item>
              <ep-form-item class="icon-active" attr="vehicleNo" label>
                <ep-input
                  icon="android-bus"
                  disabled
                  placeholder="车牌号"
                  v-model="bodyForm.vehicleNo"
                  name="vehicleNo"
                ></ep-input>
              </ep-form-item>
              <ep-form-item class="icon-select-active customCode-icon" attr="customCode" label>
                <loc-codemap-select
                  icon="pricetag"
                  disabled
                  placeholder="关区"
                  :name="'customCode'"
                  :code="'customCode'"
                  :cName="'customName'"
                  :dataList="tradeInfo"
                  :type="'custom'"
                  :value.sync="bodyForm.customCode"
                ></loc-codemap-select>
              </ep-form-item>
              <ep-form-item class="icon-select-active iePack-icon" attr="iePack" label>
                <ep-select
                  icon="android-exit"
                  disabled
                  placeholder="进出区标志"
                  v-model="bodyForm.iePack"
                  name="iePack"
                >
                  <ep-select-item index="I" label="I-进区"></ep-select-item>
                  <ep-select-item index="E" label="E-出区"></ep-select-item>
                </ep-select>
              </ep-form-item>
              <ep-form-item class="icon-active" attr="tradeName" label>
                <ep-input
                  icon="android-compass"
                  disabled
                  placeholder="企业中文名称"
                  v-model="bodyForm.tradeName"
                  name="tradeName"
                ></ep-input>
              </ep-form-item>
              <ep-form-item class="icon-active" attr="weight" label>
                <ep-input
                  icon="social-wordpress"
                  placeholder="总重量(kg)"
                  v-model="bodyForm.weight"
                  name="weight"
                ></ep-input>
              </ep-form-item>
            </ep-row>
          </ep-form>
        </div>
      </div>
      <div style="text-align:center">
        <ep-button
          :disabled="bodyForm.id?true:false"
          type="success"
          size="small"
          @click="success(Listdata)"
          icon="edit"
          :loading="saveLoading"
        >暂存</ep-button>
        <ep-button
          type="success"
          size="small"
          @click="declare()"
          :loading="applyLoading"
          icon="checkmark-round"
        >确认</ep-button>
        <!-- <ep-button type="success" size="small" @click="success(Listdata)" icon="checkmark-round">确认</ep-button> -->
        <ep-button type="danger" size="small" icon="close" @click="close()">关闭</ep-button>
      </div>
    </ep-model>
  </div>
</template>



<script>
import misList from "src/common/mislist";
import mixin from "../mixin";
import { cloneObj } from "utils/data";

export default {
  mixins: [mixin],
  extends: misList,
  props: {
    fresh: {
      type: Boolean
    },
    Listdata: {
      type: Array
    }
  },
  components: {},
  data() {
    return {
      saveLoading: false,
      applyLoading: false,
      bodyForm: {
        orgId: this.$store.getters.getId,
        packageListNo: "",
        vehicleNo: this.Listdata[0] && this.Listdata[0].vehicleNo,
        customCode: "2249",
        iePack: this.Listdata[0] && this.Listdata[0].ieTypecd,
        optStatus: "1",
        dclTypecd: "1",
        tradeName: this.$store.getters.getTradeName,
        weight: ""
        // bookType: ''
      },
      timer: "",
      modelFlag: false,
      page_rules: {
        weight: { required: true, message: "不能为空", trigger: "change" }
        // vehicleNo: {
        //   required: true,
        //   validator: validateIdNum,
        //   trigger: 'change, blur'
        // },
        // packageListNo: {
        //   required: true,
        //   message: '不能为空',
        //   trigger: 'change, blur'
        // }
      }
    };
  },
  computed: {},
  watch: {
    modelFlag(value) {
      if (!value) {
        this.$emit("nowFlagChange", false);

        if (this.bodyForm.id) {
          this.$emit("success", true);
          this.bodyForm.id = "";
        }
        this.$refs["bodyForm"].reset();
      }
    },
    fresh(value) {
      if (value) {
        this.modelFlag = true;
        this.bodyForm.vehicleNo = this.Listdata[0].vehicleNo;
        this.bodyForm.iePack = this.Listdata[0].ieTypecd;
      } else {
        this.modelFlag = false;
      }
    },
    "bodyForm.weight": {
      handler(newName, oldName) {
        if (
          newName !== null &&
          newName.charAt(0) == "0" &&
          newName.length > 1 &&
          newName.charAt(1) !== "."
        ) {
          this.$pop({
            type: "danger",
            message: "请输入正确的总重量"
          });
        }
        let reg = /^\d{0,13}(\.\d{0,5})?$/;
        if (!reg.test(newName)) {
          setTimeout(() => {
            this.bodyForm.weight = oldName;
          });
        }
      }
    }
  },

  mounted() {
    // this.time()
  },
  methods: {
    close() {
      //关闭当前模块
      this.modelFlag = false;
      this.$refs["bodyForm"].reset();
    },

    time() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let H = date.getHours();
      let mm = date.getMinutes();
      let s = date.getSeconds();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      H = H < 10 ? "0" + H : H;
      let timer = `${y + "-" + m + "-" + d + " "}`;
      this.Listdata.createTime = timer;
    },
    success(Listdata) {
      if (this.bodyForm.id) {
        this.$pop({
          type: "danger",
          message: "已暂存!"
        });
        return;
      }
      console.log(this.Listdata);
      let packageSaspassport = [];

      this.Listdata &&
        this.Listdata.forEach(el => {
          // let passport = el.inExpType;
          // if (passport == "3") {
          //   passport = "G";
          // } else if (passport == "6") {
          //   passport = "D";
          // } else if (passport == "0" || passport == "4") {
          //   passport = "";
          // } else if (passport == "1" || passport == "2" || passport == "5") {
          //   passport = "C";
          // }
          let data = {
            sasPassportPreentNo: el.preentNo,
            sasOptStatus: "5",
            passportTypecd: el.inExpType,
            customCode: "2249",
            ioTypecd: el.ieTypecd,
            rmk: el.id
          };
          packageSaspassport.push(data);
        });
      this.bodyForm["packageSaspassport"] = packageSaspassport;
      this.$refs["bodyForm"].validate(valid => {
        if (valid) {
          // if (this.bodyForm.id) {
          //   // let form = cloneObj(this.bodyForm);
          //   // delete form.id;
          //   this.$post('pickRideUpdatePackageList', this.bodyForm)
          //     .then(res => {})
          //     .catch(() => {});
          //   return;
          // }
          this.saveLoading = true;

          this.$post("pickRideSavePackageList", this.bodyForm)
            .then(res => {
              this.bodyForm.id = JSON.stringify(res.map.id);
              this.bodyForm.packageListNo = res.map.packageListNo;
              this.saveLoading = false;
              // this.$refs['bodyForm'].reset()
              // this.close();
            })
            .catch(() => {
              this.saveLoading = false;
            });
        }
      });
    },
    declare() {
      if (!this.bodyForm.id) {
        this.$pop({
          type: "danger",
          message: "请先暂存!"
        });
        return;
      }
      this.$confirm({
        word: "是否确认已装车？",

        callback: errorInfo => {
          if (errorInfo) {
            this.applyLoading = true;
            this.$post("pickRidePackageListDeclare", {
              bscIds: [Number(this.bodyForm.id)]
            })
              .then(res => {
                this.close();
                this.applyLoading = false;
              })
              .catch(() => {
                this.applyLoading = false;
              });
          }
        }
      });
    }
  }
};
</script>


<style scoped>
.icon-select-active >>> .ep-select .ep-input__icon::after {
  content: "\F458";
  display: inline-block;
  font-family: "Ionicons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-rendering: auto;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  right: 310px;
  top: 5px;
  font-size: 17px;
}
.customCode-icon >>> .ep-select .ep-input__icon::after {
  content: "\F2AA";
}
.iePack-icon >>> .ep-select .ep-input__icon::after {
  content: "\F385";
}
.icon-active >>> .ep-input__icon {
  left: 0px;
  font-size: 17px;
}
/* .icon-active >>> .ion-edit {
  left: 0px;
} */
.icon-active >>> .ep-input__inner,
.icon-select-active >>> .ep-input__inner {
  padding-left: 34px !important;
}

.ep-form--item.is-required:before {
  content: "*";
  color: #e74c3c;
  position: absolute;
  margin-top: 7px;
  margin-left: -7px;
}
.modelFlagbox {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  height: 550px;
}
.addgenerate {
  width: 35%;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  background: #fff;
  border-left: 1px solid #c1c1c1;
}
.product {
  padding: 8px;
  width: 65%;
  /* padding: 10px; */
  display: flex;
  /* max-height: 710px;  */
  /* flex-wrap: wrap; */
  /* background: rgb(183, 211, 228); */
  display: flex;
  height: 100%;
  overflow: auto;
  flex-direction: column;
  padding-right: 30px;
}
.table {
  width: 100%;
}
.table a {
  color: rgb(194, 0, 5);
}

p {
  /* margin: 0; */
  /* font-size: 14px; */
  font-size: 13px;
  padding: 0px 5px;
}
td {
 border: 1px solid #e4e4e4;
    font-size: 14px;
    background-color: #f3f5fb;
    padding: 10px;
    font-size: 13px;
    color: #666666;
    text-align: center;
}
span {
  /* overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap; */
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis; /*文字隐藏后添加省略号*/
  white-space: nowrap; /*强制不换行*/
  width: 100%;
  /*width: 20em;*/
  /*不允许出现半汉字截断*/
}
</style>

