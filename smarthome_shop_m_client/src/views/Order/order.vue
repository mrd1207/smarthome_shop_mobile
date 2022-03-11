<template>
  <div class="order">
    <header>
      <van-nav-bar
        title="订单"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
    </header>
    <section>
      <van-cell-group inset>
        <van-cell title="配送地址" />
        <van-cell
          :title="nameTel"
          :label="addressDetail"
          size="large"
          @click="selectAddress"
        />
      </van-cell-group>
      <div class="card" v-for="(item, index) in selectList" :key="index">
        <van-card
          :num="item.buy_count"
          :price="item.price"
          desc="规格:默认"
          :title="item.goods_name"
          :thumb="item.thumb_url"
        />
      </div>
      <!-- <van-radio name="1">微信</van-radio>
          <van-radio name="2">支付宝</van-radio>
          <van-radio name="3">货到付款</van-radio>
        </van-radio-group> -->
      <div class="radio">
        <van-radio-group v-model="radio">
          <van-cell-group :border="border">
            <van-cell title="支付宝" clickable @click="radio = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="微信" clickable @click="radio = '2'">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
            <van-cell title="货到付款" clickable @click="radio = '3'">
              <template #right-icon>
                <van-radio name="3" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </section>
    <footer>
      <van-submit-bar
        :price="total.price * 100"
        button-text="提交订单"
        @submit="onSubmit"
      />
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import qs from 'qs'
import {
  createOrder,
  updateOrderAddress,
  findOrderId,
  submitOrder,
  goPayment,
} from "@/api/order";

export default {
  data() {
    return {
      radio: "1",
      border: false,
      nameTel: "",
      addressDetail: "",
      data: {},
    };
  },
  created() {
    this.getData();
  },
  computed: {
    profile() {
      return this.$store.state.user.profile;
    },
    ...mapState({
      selectList: (state) => state.cart.selectList,
      orderId: (state) => state.order.orderId,
      orderAddress: (state) => state.address.orderAddress,
    }),
    ...mapGetters(["total", "getOrderAddress"]),
  },
  methods: {
    getData() {
      // this.orderId
        this.$store.dispatch("AddressLists").then(res=>{
            console.log('resadds: ', res);
        })
      //   console.log("this.orderId: ", this.orderId);
      let orderIdData = `order_id=${this.orderId}`;
      //   console.log("orderIdData: ", orderIdData);
      // }
      order_id: findOrderId(orderIdData).then((res) => {
        console.log("yres: ", res.data.message, res.data.state_code);
        if (!res.data.state_code) {
            // this.nameTel = `${this.getOrderAddress.real_name} ${this.getOrderAddress.tel}`;
            // this.addressDetail = `${this.getOrderAddress.province}${this.getOrderAddress.city}${this.getOrderAddress.county}${this.getOrderAddress.street_name}`;
          this.nameTel = `${this.orderAddress.real_name} ${this.orderAddress.tel}`;
          this.addressDetail = `${this.orderAddress.province}${this.orderAddress.city}${this.orderAddress.county}${this.orderAddress.street_name}`;
          let data = {
            cartToOrder: this.selectList,
            address: this.getOrderAddress,
            user_id: this.profile.id,
            user_nickname: this.profile.user_nickname,
            payment: this.total.price,
          };
          console.log("this.data: ", data);
          createOrder(data).then((res) => {
            console.log("res: ", res.data.message);
            this.$store.commit("setOrder", res.data.message);
          });
          let addressData = {
            order_id: this.orderId,
            address: this.orderAddress,
          };
          updateOrderAddress(addressData).then((res) => {
            console.log("ressss: ", res);
          });
        } else {
          this.nameTel = `${this.orderAddress.real_name} ${this.orderAddress.tel}`;
          this.addressDetail = `${this.orderAddress.province}${this.orderAddress.city}${this.orderAddress.county}${this.orderAddress.street_name}`;
          let addressData = {
            order_id: this.orderId,
            address: this.orderAddress,
          };
          updateOrderAddress(addressData).then((res) => {
            console.log("ressss: ", res);
          });
        }
      });
      //   需要发送的请求
      // user_id
      // 地址 address{real_name, tel,province,city,county,street_name}
      // 订单 order{user_nickname,state,payment} //订单号由后端生成
      // 商品 cartToOrder[{goods_id,buy_count,goods_name,price,thumb_url}]
    },
    // ...mapActions(["AddressLists"]),
    selectAddress() {
      this.$router.push({
        path: "/address",
        query: {
          type: "select",
        },
      });
    },
    onClickLeft() {
      this.$store.commit("setOrder", "");
      this.$router.push("/cart");
    },
    onSubmit() {
      //订单的商品，用于删除购物车；订单号；
      let data = {
        shopArr: this.selectList,
        orderId: this.orderId,
      };
        
      submitOrder(data).then((res) => {
        console.log("submitres: ", res);
        //将订单商品列表的商品名称放到新数组，再以''为分割拼接成字符串
        let arr = [];
        this.selectList.forEach((element) => {
          arr.push(element.goods_name);
        });
        let datas = {
          orderId: this.orderId,
          name: arr.join(""),
          price:this.total.price
        };
        //增加安全性的序列号
        goPayment(qs.stringify(datas)).then((resss) => {
            //返回的是一个支付宝链接
            console.log('resss: ', resss);
            if(resss.data.data.success){
                window.location.href=resss.data.data.paymentUrl;
            }
        });
      });

      this.$router.push("/payment");
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
section {
  margin-top: 1.4rem;
}
.van-cell__title {
  font-weight: 600;
}
.radio {
  height: 3.6rem;
  width: 85%;
  font-size: 0.375rem;
  /* padding: 0 0.1875rem; */
  margin-top: 0.625rem 0.3rem;
  background-color: #fff;
  padding: 0.1rem 0.3rem;
  margin: 0 auto;
  border-radius: 0.15rem;
  margin-bottom: 2rem;
}
.radio .van-cell {
  /* padding-top: 1rem; */
  height: 1.2rem;
}
.card {
  width: 91%;
  margin: 0.3125rem auto;

  background-color: #fff;
}
.van-card {
  padding: 0.3125rem;
  background-color: #fff;
}
/* .van-radio-group {
} */
/* .van-radio {
  margin: 0.5rem 0;

  display: flex;
  justify-content: space-between;
} */
</style>