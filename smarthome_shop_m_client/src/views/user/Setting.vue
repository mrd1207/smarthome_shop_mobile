<template>
  <div class="set">
    <van-nav-bar
      title="设置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group inset class="group">
      <van-cell title="通用" is-link @click="normal" />
      <van-cell title="修改密码" is-link @click="changePwd" />
      <van-cell title="设置新密码" is-link @click="setPwd" />
      <van-cell title="帮助与反馈" is-link @click="feedback" />
      <van-cell title="关于商城" is-link @click="about" />
    </van-cell-group>
    <!-- 退出登录 -->
    <div class="logout">
      <van-button round type="danger" size="large" @click="logout"
        >退出登录</van-button
      >
      <!-- 修改密码 -->
      <van-dialog
        v-model="show"
        title="修改密码"
        show-cancel-button
        :beforeClose="beforeCloseChangePwd"
      >
        <van-cell-group class="changepwd">
          <van-field
            v-model="oldPwd"
            label="旧密码"
            placeholder="请输入旧密码"
          />
          <van-field
            v-model="newPwdf"
            label="新密码"
            placeholder="请输入新密码"
          />
          <van-field
            v-model="newPwds"
            label="新密码"
            placeholder="再次输入新密码"
          />
        </van-cell-group>
      </van-dialog>
      <!-- 设置密码 -->
      <van-dialog
        v-model="shownew"
        title="设置新密码"
        show-cancel-button
        :beforeClose="beforeCloseNewPwd"
      >
        <van-cell-group class="changepwd">
          <van-field
            v-model="newPwdfs"
            label="新密码"
            placeholder="请输入新密码"
          />
          <van-field
            v-model="newPwdss"
            label="新密码"
            placeholder="再次输入新密码"
          />
        </van-cell-group>
      </van-dialog>
      <!-- 反馈 -->
      <van-dialog
        v-model="showfeedback"
        title="反馈"
        show-cancel-button
        :beforeClose="beforeCloseFeedback"
      >
        <van-cell-group class="feedback">
          <van-field
            v-model="message"
            rows="5"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入反馈"
            show-word-limit
          />
        </van-cell-group>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { checkPwd, setNewPwd, changePwd, submitFeedback } from "@/api/user";
export default {
  mounted() {},
  data() {
    return {
      show: false,
      shownew: false,
      showfeedback: false,
      oldPwd: "",
      newPwdf: "",
      newPwds: "",
      newPwdfs: "",
      newPwdss: "",
      feedbackContent: "",
      message: "",
      rules: {
        //密码验证
        password: {
          rule: /^\w{6,12}$/,
          msg: "密码不能为空,且要求6-12位",
        },
      },
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  computed: {
    profile() {
      return this.$store.state.user.profile;
    },
  },
  methods: {
    onClickLeft() {
      this.$router.push("/user");
    },
    normal(){
        Toast("正在开发中");
    },
    // 修改密码
    changePwd() {
      console.log("profile: ", this.profile);

      let param = "id=" + this.profile.id;
      checkPwd(param).then((res) => {
        console.log("res: ", res.data.success_code);
        if (res.data.success_code == 0) {
          Toast("请先设置新密码!");
        } else {
          this.isNewPwd = res.data.success_code;
          this.show = true;
        }
      });
    },
    beforeCloseChangePwd(action, done) {
      if (action === "confirm") {
        if (!this.validate("password", "newPwdf")) {
          done(false);
          return;
        }
        if (!this.validate("password", "newPwds")) {
          done(false);
          return;
        }
        if (!this.validate("password", "oldPwd")) {
          done(false);
          return;
        }
        if (this.newPwdf == this.newPwds) {
          let param = `id=${this.profile.id}&newPwd=${this.newPwdf}&oriPwd=${this.oldPwd}`;
          changePwd(param).then((res) => {
            console.log("res: ", res);
            if (res.data.err_code == 0) {
              done(false);
              Toast("原密码不正确");
            } else if (res.data.success_code == 200) {
              Toast("修改成功");
              done();
            }
          });
        } else {
          Toast("新旧密码不一致,请重新输入");
          done(false);
        }
      } else {
        done();
      }
    },
    // 正则验证
    validate(key, pwdName) {
      let bool = true;
      if (!this.rules[key].rule.test(this[pwdName])) {
        Toast(this.rules[key].msg);
        bool = false;
        return false;
      }
      return bool;
    },
    // 新密码
    setPwd() {
      this.newPwdfs = "";
      this.newPwdss = "";
      let param = "id=" + this.profile.id;
      checkPwd(param).then((res) => {
        console.log("res: ", res.data.success_code);
        if (res.data.success_code !== 0) {
          Toast("已设置新密码!");
        } else {
          this.shownew = true;
        }
      });
    },
    beforeCloseNewPwd(action, done) {
      if (action === "confirm") {
        // 判断密码再6-12位
        if (!this.validate("password", "newPwdfs")) {
          done(false);

          return;
        }
        if (!this.validate("password", "newPwdss")) {
          done(false);

          return;
        }

        if (this.newPwdfs == this.newPwdss) {
          let param = `id=${this.profile.id}&password=${this.newPwdfs}`;
          setNewPwd(param).then((res) => {
            if (res.data.success_code == 200) {
              Toast("密码设置成功");
            } else {
              Toast("密码设置失败");
            }
            // console.log("res: ", res);
          });
          done();
        } else {
          Toast("密码不一致,请重新输入");
          done(false);
        }
      } else {
        done();
      }
    },

    // 帮助与反馈
    feedback() {
      this.message = "";
      this.showfeedback = true;
    },
    beforeCloseFeedback(action, done) {
      if (action === "confirm") {
        if (this.message) {
          let param = `id=${this.profile.id}&content=${this.message}`;
          console.log("param: ", param);
          submitFeedback(param).then((res) => {
            if (res.data.success_code == 200) {
              Toast("已经提交反馈");
            } else {
              Toast("提交反馈失败");
            }
            console.log("res: ", res);
          });
          done();
        } else {
          Toast("内容不能为空");
          done(false);
        }
      } else {
        done();
      }
    },
    //关于商城
    about() {
      Dialog.alert({
        message: "iHome商城 v1.0",
      }).then(() => {
        // on close
      });
    },
    // 退出登录
    logout() {
      Dialog.confirm({
        //   title: "标题",
        message: "是否退出登录",
        confirmButtonText: "确认",
        confirmButtonColor: "#4d87fa",
      })
        .then(() => {
          // on confirm
          Object.keys(this.profile).forEach((key) => {
            this.profile[key] = "";
          });
          this.$router.push("/home");
        })
        .catch(() => {
          // on cancel
          Toast("已取消");
        });
      //清空数据

      console.log("profile: ", this.profile);
    },
  },
};
</script>

<style scoped>
.set {
  width: 100%;
}
.logout {
  padding: 0.35rem;
}
.group {
  margin-top: 0.625rem;
}
.changepwd {
  padding: 0.4rem;
}
</style>