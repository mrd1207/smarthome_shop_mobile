<template>
  <div class="login">
    <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="users">
      <div class="userp">
        <!-- 账号密码登录 -->

        <!-- 验证码 -->
        <van-form @submit="onSubmitcode" class="form">
          <div class="codelogin">
            <van-field
              name="tel"
              v-model="tel"
              type="tel"
              placeholder="请输入手机号"
              label="手机号"
            />
            <van-field
              name="sms"
              v-model="sms"
              center
              clearable
              label="短信验证码"
              placeholder="请输入验证码"
            >
              <template #button>
                <van-button
                  plain
                  round
                  hairline
                  :disabled="disabled"
                  size="small"
                  type="info"
                  native-type="button"
                  @click="sendCode"
                  >{{ codeState }}</van-button
                >
              </template>
            </van-field>
            <van-field
              v-model="password"
              type="password"
              name="user_pwd"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true }]"
            />
          </div>
          <div style="margin: 16px">
            <van-button round block type="info" native-type="onSubmitcode"
              >登录</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
    <!-- 验证码登录 -->
  </div>
</template>

<script>
import { Toast } from "vant";
import { loginPwd, sendPhoneCode, loginCode, register } from "@/api/user";
import mapStore from "vuex";
import { Dialog } from "vant";
export default {
  data() {
    return {
      //表单
      password: "",
      rules: {
        //手机号验证
        //密码验证
        password: {
          rule: /^\w{6,12}$/,
          msg: "密码不能为空,且要求6-12位",
        },
        tel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "手机号不能为空，并且是11位数字",
        },
        sms: {
          rule: /^\d{4}$/,
          msg: "验证码输入有误",
        },
      },
      //验证码
      tel: "",
      sms: "",
      relsms: "",
      // 状态
      state: 0,
      codeState: "发送验证码",
      disabled: false,
      codeNum: 6,
    };
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f7f7f7");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  methods: {
    onClickLeft() {
      //   Toast("返回");
      this.$router.go(-1);
    },
    //验证信息提示
    validate(key) {
      let bool = true;
      if (!this.rules[key].rule.test(this[key])) {
        //提示信息
        Toast(this.rules[key].msg);
        bool = false;
        return false;
      }
      return bool;
    },
    // 验证码登录
    async onSubmitcode(values) {
      if (!this.validate("tel")) return;
      if (!this.validate("sms")) return;
      //   console.log("values: ", values);
      //   console.log("values.sms == this.relsms: ", values.sms, this.relsms);
      // if (values.sms == this.relsms) {
      let registerParam = `phone=${values.tel}&code=${values.sms}&password=${values.user_pwd}`;
      console.log("registerParam: ", values);
      //   console.log("phoneCodeParam: ", phoneCodeParam);
      let res = await register(registerParam);
      console.log("data: ", res);
      if (res.data.success_code == 300) {
        Dialog.confirm({
          //   title: "标题",
          message: "该账号已注册",
          confirmButtonText: "去登录",
          confirmButtonColor: "#4d87fa",
        })
          .then(() => {
            // on confirm
            this.$router.push("/login");
          })
          .catch(() => {
            // on cancel
            Toast("已取消");
          });
      } else if (res.data.success_code == 200) {
          console.log('res.data: ', res.data);
        Dialog.confirm({
          //   title: "标题",
          message: "注册成功",
          confirmButtonText: "直接登录",
          confirmButtonColor: "#4d87fa",
        })
          .then(() => {
        Toast("注册成功");

            // on confirm
            const {
              token,
              id,
              user_address,
              user_avatar,
              user_birthday,
              user_name,
              user_nickname,
              user_phone,
              user_sex,
              user_sign,
            } = res.data.message;

            this.$store.commit("setUser", {
              token,
              id,
              user_address,
              user_avatar,
              user_birthday,
              user_name,
              user_nickname,
              user_phone,
              user_sex,
              user_sign,
            });
            this.$router.push("/user");

          })
          .catch(() => {
            // on cancel
            this.$router.push("/home");
          });

        // this.$router.push("/home");
      }
    },
    // 发送验证码
    sendCode() {
      if (!this.validate("tel")) return;
      this.disabled = true;
      //倒计时
      let timer = setInterval(() => {
        --this.codeNum;
        this.codeState = `重新发送 ${this.codeNum}`;
      }, 1000);
      //判断什么时候停止定时器
      setTimeout(() => {
        clearInterval(timer);
        this.codeNum = 6;
        this.disabled = false;
        this.codeState = "获取短信验证码";
      }, 6000);
      //发送请求
      let phoneParam = `phone=${this.tel}`;

      sendPhoneCode(phoneParam).then((res) => {
        console.log("res: ", res.data.data.data);
        this.relsms = res.data.data.data;
      });
    },

    tranBtn() {
      if (this.state == 1) {
        this.state = 0;
        this.stateMsg = "短信";
      } else {
        this.state = 1;
        this.stateMsg = "密码";
      }
    },
  },
};
</script>
<style scoped>
.users {
  height: 80vh;
  display: flex;
  align-items: center;
}
.userp {
  width: 90%;
  height: 200px;
  margin: 0rem auto;
  padding: 0.5rem 0.1875rem;
  background-color: #fff;
  border-radius: 0.6rem;
}
.tranBtn {
  display: flex;
  justify-content: space-between;
  font-size: 0.35rem;
  padding: 0 0.5rem;
  color: #4d87fa;
}
</style>
