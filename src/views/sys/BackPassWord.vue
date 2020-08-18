<template>
    <div class="out-box">
        <div class="header">
            <div class="logo-style">
            </div>

        </div>
        <div class="header-mid">
            <span style="font-size:25px;margin-left:30px;margin-top:20px;">
                重置密码
            </span>

        </div>
        <div class="from-content">

            <div class="from-pass">
                <div style="width:600px;margin:0 auto;text-align:center;">

                    <label class="label-style">手机号:</label>
                    <input placeholder="必填，用于接收申请结果" v-model="phone" />
                    <ep-button class="cold-style" v-show="isShowTrue" @click="sendClod">发送验证码</ep-button>
                    <ep-button class="cold-style show" v-show="isShowFalse">{{time+"秒后可重新发送"}}</ep-button>
                    <br>
                    <br>
                    <label class="label-style">用户名:</label>
                    <input placeholder="请输入您的用户名" v-model="userName"/>

                    <br>
                    <br>
                    <label class="label-style">
                        验证码:
                    </label>
                    <input placeholder="请输入您接收到的验证码" v-model="verifyCode"/>
                    <br>

                    <br>
                    <ep-button type="primary" @click="submit" size="large">确认修改</ep-button>

                </div>

            </div>

        </div>

        <div style="width:980px; margin:0 auto;text-align:center;font-size:12px;">
            <!-- <p>
                Copyright (C) 2001-2019 easipass.com. All Rights Reserved
            </p> -->

        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      verifyCode: "",
      userName: "",
      time: 60,
      isShowTrue: true,
      isShowFalse: false,
      times: ""
    };
  },
  mounted() {},
  methods: {
    sendClod() {
      let reg = new RegExp(
        /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
      );
      if (!reg.test(this.phone)) {
        this.$pop({
          type: "danger",
          message: "请输入正确的手机号码"
        });
        return;
      }
      this.isShowFalse = true;
      this.isShowTrue = false;
      this.times = setInterval(this.timesChange, 1000);

      let data = { phone: this.phone };
      this.$post("BackLogin", data)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    timesChange() {
      this.time--;
      if (this.time == 0) {
        clearInterval(this.times);
        this.time = 60;
        this.isShowFalse = false;
        this.isShowTrue = true;
      }
    },
    submit() {
      let reg = new RegExp(
        /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
      );
      if (!reg.test(this.phone)) {
        this.$pop({
          type: "danger",
          message: "请输入正确的手机号码"
        });
        return;
      }
      if (this.verifyCode == "") {
        this.$pop({
          type: "danger",
          message: "请输入验证码"
        });
        return;
      }
      let data = {
        phone: this.phone,
        verifyCode: this.verifyCode,
        userName: this.userName
      };
      this.$post("BackLoginUser", data)
        .then(res => {
          this.$router.push({ name: "登录" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
.out-box {
  width: 100%;
  height: 100%;
  background: #eee;
}
.header {
  width: 980px;
  margin: 0 auto;
  height: 100px;
  padding-top: 20px;
  line-height: 100px;
}
input {
  display: inline-block;
  width: 342px;
  height: 46px;
  font-size: 14px;
}
.cold-style {
  display: inline-block;
  width: 100px;
  height: 35px;
  border: 1px solid #2f86f6;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  position: absolute;
  top: 10px;
}
.cold-style.show {
  display: inline-block;
  width: 150px;
  height: 35px;
  border: 1px solid #2f86f6;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  position: absolute;
  top: 10px;
}
.header-mid {
  line-height: 50px;
  width: 980px;
  margin: 0 auto;
  height: 50px;
  background: #fff;
}
.from-content {
  width: 980px;
  height: 400px;
  margin: 0 auto;

  position: relative;
  background: #fff;
}
.label-style {
  display: inline-block;
  height: 20px;
  width: 70px;
  font-size: 16px;
  text-align: right;
}
.from-pass {
  width: 800px;
  height: 150px;
  position: absolute;
  left: 0;
  right: 0;
  top: -80px;
  bottom: 0;
  margin: auto;
}
.ep-button--large {
  margin-top: 5px;
  padding: 8px 30px;
  font-size: 16px;
  border-radius: 2px;
}
.logo-style {
  width: 600px;
  height: 50px;
  background-size: 100% 100%;

  background-image: url("../../assets/frame/logo.png");
}
</style>