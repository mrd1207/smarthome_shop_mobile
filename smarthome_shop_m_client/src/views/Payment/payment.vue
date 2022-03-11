<template>
  <div class="payment">
    <header>
      <van-nav-bar
        title="支付"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
    </header>
    <section>
      <div class="main">
        <div>
          <div class="success">
            <van-icon name="checked" color="#1989fa" />
            <span>{{ msg }}</span>
          </div>
          <div class="btn">
            <van-button type="default" size="small" round to="Home">返回首页</van-button>
            <van-button type="default" size="small"  round>查看订单</van-button>
          </div>
        </div>
      </div>
        <Like :Like="Like" class="recomand"></Like>

    </section>
    <footer></footer>
  </div>
</template>

<script>
import { successPayment } from "@/api/order";
import Like from "../../components/home/Like";
import { Homeshoplist } from "@/api/home";

import qs from "qs";
export default {
  components: {
    Like,
  },
  created() {
    this.getData();
  },
  data() {
    return {
      msg: "",
      Like: [],
    };
  },
  methods: {
    getData() {
      let data = {
        out_trade_no: this.$route.query.out_trade_no,
        trade_no: this.$route.query.trade_no,
      };

      console.log("qs.stringify(data): ", qs.stringify(data));
      successPayment(qs.stringify(data)).then((res) => {
        console.log("res: ", res.data.data.code);
        if (res.data.data.code == 2) {
          this.msg = "支付成功";
        } else if (res.data.data.code == 0) {
          this.msg = "未付款";
        } else if (res.data.data.code == 1) {
          this.msg = "交易关闭";
        } else {
          this.msg = "交易失败";
        }
        Homeshoplist().then((res) => {
          this.Like.push(
            ...res.data.message[2],
            ...res.data.message[3],
            ...res.data.message[4]
          );
        });
      });
    },
    onClickLeft() {
      this.$router.push("/order");
    },
  },

  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f7f7f7");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style scoped>
.payment {
  width: 100%;
  height: 100%;
}
section {
  margin-top: 1.2rem;
  /* margin: 0 auto; */
  /* display: flex; */
  /* justify-content: center; */
}
.main {
  width: 100%;
  display: flex;
  justify-content: center;
}
.success {
  margin-top: 1rem;
  font-size: 0.6rem;
  padding: 0.3125rem;
}
.success span {
  padding: 0.2rem;
}
.btn {
  display: flex;
}

.van-button {
  margin: 0 0.1rem;
}

.recomand {
  margin-top: 1rem;
}
</style>