<template>
  <div class="cart">
    <van-nav-bar
      title="购物车"
      fixed
      :right-text="isEditText"
      @click-right="onClickRight"
      @nav-bar-text-color
    />
    <section>
      <div class="main">
        <div v-if="cartgoods.length">
          <div v-for="(item, index) in cartList" :key="index">
            <div class="cartgoods">
              <div class="checkbox">
                <van-checkbox
                  v-model="item.checked"
                  @click="checkItem(item)"
                ></van-checkbox>
              </div>
              <div class="imgs">
                <img :src="item.thumb_url" alt="" />
              </div>
              <div class="info">
                <div class="goodstitle">
                  {{ item.goods_name }}
                </div>
                <div class="addBtn">
                  <div class="price">{{ item.price }}</div>
                  <van-stepper
                    integer
                    v-model="item.buy_count"
                    @change="onChange($event, item)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="empty" v-else>
          <van-empty description="空空如也～" />
          <like :Like="Like"> </like>
        </div>
        <div class="edit">
          <div class="bottombar">
            <div class="sel">
              <van-checkbox
                @change="checkAllFn"
                v-model="isCheckedAll"
                class="checkbox"
              >
                <span>全选</span>
              </van-checkbox>
              <div class="title">
                <div class="count">共选择{{ total.num }}件商品</div>
                <div class="prices">合计: ¥{{ total.price.toFixed(2) }}元</div>
              </div>

              <van-button round type="info" v-if="!isEdit" @click="goOrder"
                >去结算
              </van-button>
              <van-button round type="danger" plain v-else @click="delGoodsFn"
                >删除
              </van-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "../components/common/Tabbar.vue";
import { findCartGoods, deleteCart, updateCart } from "@/api/cart";
import Like from "../components/home/Like.vue";
import { Homeshoplist } from "@/api/home";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { Dialog, Toast } from "vant";

export default {
  name: "Cart",
  components: {
    Tabbar,
    Like,
  },
  created() {
    this.getData();
  },
  data() {
    return {
      cartgoods: [],
      disabled: true,
      Like: [],
      isEdit: false,
      isEditText: "编辑",
      value: 1,
      checked: false,
      isCheckedAll: false,
      count: 0,
    };
  },
  computed: {
    userid() {
      return this.$store.state.user.profile.id;
    },
    ...mapState({
      cartList: (state) => state.cart.cartList,
      selectList: (state) => state.cart.selectList,
    }),
    ...mapGetters(["total", "delGoods"]),
  },
  methods: {
    goOrder() {
      this.$store.commit("setOrder", "");

      let list = this.cartList.filter((Element) => Element.checked);

      console.log("list: ", list);
      if (!list.length) {
        Toast("请至少选择一件商品");
        return;
      }
      this.$store.commit("setSelectList", list);
      this.$router.push("/order");
    },
    onClickRight() {
      // this.setSelect();
      if (!this.isEdit) {
        this.isEditText = "取消编辑";
        this.isEdit = true;
        // this.$store.commit("setSelect");
      } else {
        this.isEditText = "编辑";
        this.isEdit = false;
        // this.$store.commit("setSelect");
      }
    },

    getData() {
      console.log("this.userId: ", this.userid);
      findCartGoods({ user_id: this.userid }).then((res) => {
        res.data.message.forEach((v) => {
          v["checked"] = false;
        });
        this.$store.commit("setCartList", res.data.message);
        console.log("res: ", res.data.message);
        this.cartgoods = this.$store.state.cart.cartList;
      });
      Homeshoplist().then((res) => {
        this.Like.push(
          ...res.data.message[2],
          ...res.data.message[3],
          ...res.data.message[4]
        );
      });
    },

    ...mapActions(["delGoodsFn"]),
    delGoodsFn() {
      Dialog.confirm({
        message: "是否删除购物车选中的商品",
      }).then(() => {
        // on confirm
        let data = {};
        data.arrId = this.delGoods;
        
        console.log(" data.arrId: ", data.arrId);
        deleteCart(data).then((res) => {
          console.log("res: ", res);
          this.getData();
        });
      });
    },

    checkAllFn() {
      // 点击的是全选
      if (this.isCheckedAll == true) {
        this.count = this.cartList.length;
        this.cartList.forEach((Element) => {
          Element.checked = true;
        });
      } else {
        // 点击的是反选（点击反选的前提是全选状态，否则就是全选状态）
        if (this.count == this.cartList.length) {
          this.count == 0;
          this.cartList.forEach((Element) => {
            Element.checked = false;
          });
        }
      }
    },
    checkItem() {
      this.count = this.cartList.filter((Element) => Element.checked).length;
      this.count == this.cartList.length
        ? (this.isCheckedAll = true)
        : (this.isCheckedAll = false);
    },
    // 步进器
    onChange(value, item) {
      console.log("value,item: ", value, item);
      let data = {
        goods_id: item.goods_id,
        count: value,
        user_id: this.userid,
      };
      updateCart(data).then((res) => {
        console.log("res: ", res);
      });
    },
  },

  // 背景色
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
.cart {
  height: 100%;
  width: 100%;
  background-color: #f7f8fa;
}
.main {
  margin-top: 1.5rem;
  margin-bottom: 3rem;
}
/* 商品 */
.cartgoods {
  /* width: 100%; */
  height: 2.6rem;
  background-color: white;
  padding: 0.1875rem;
  margin: 0.225rem;
  margin-right: 0.1875rem;
  border-radius: 0.125rem;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 4px 1px rgb(180, 180, 180);
}
.imgs {
  width: 2.6rem;
  height: 2.6rem;
  margin: 0.1875rem;
  /* align-self: center;   */
}
.imgs img {
  height: 100%;
  border-radius: 0.125rem;
}

.info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.addBtn {
  width: 100%;
  height: 0.7rem;
  display: flex;
  justify-content: space-between;
  /* align-items: baseline; */
  align-items: center;
}
.goodstitle {
  font-size: 0.33rem;
  /*文本溢出显示省略号*/
  text-overflow: ellipsis;
  /*溢出的部分隐藏*/
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.price {
  font-size: 0.5rem;
  color: red;
  font-weight: 500;
  line-height: 1.4;
}
/* 底部 */
.bottombar {
  border-bottom: solid;
  border-color: rgb(231, 231, 231);
  background-color: aliceblue;

  width: 100%;
  height: 1.5rem;
  position: fixed;
  bottom: 1.4rem;
  z-index: 1000;
}
.sel {
  display: flex;
  align-items: center;
  height: 1.5rem;
}
.title {
  font-size: 0.42rem;
  color: #1989fa;
  font-weight: 500;
  /* 占的份数 在没有宽度的子项目里用*/
  flex: 1;
  padding-left: 0.1875rem;
}

.checkbox {
  height: 1.5rem;
  font-size: 0.375rem;
  padding: 0 0.1875rem;
}
/* .checkbox span */
.van-button {
  margin: 0.1875rem;
}
</style>