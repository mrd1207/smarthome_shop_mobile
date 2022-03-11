

<template>
  <div class="goodsdetail">
    <!-- 导航 -->
    <!-- <van-nav-bar
      title="商品详情"
      left-text="返回"
      right-text="分享"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight(url)"
    /> -->
    <Detailheader></Detailheader>
    <!-- 图片 -->
    <img class="im" :src="goodsInfo.image_url" />
    <!-- 详情 -->
    <Goodsinfo :goodsInfo="goodsInfo"></Goodsinfo>
    <!-- 评论和商品详情 -->
    <van-tabs v-model="active" class="tabs">
      <van-tab title="商品详情"
        ><van-empty description="暂无商品详情" />
      </van-tab>
      <van-tab :title="commentCount">
        <div v-if="this.goodsComment.length === 0">
          <van-empty description="暂无评论" />
        </div>
        <div v-else>
          <Comment
            v-for="(item, index) in goodsComment"
            :key="index"
            :goodsComment="item"
          ></Comment>
        </div>
      </van-tab>
    </van-tabs>
    <!-- 商品规格选择 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
      :custom-stepper-config="customStepperConfig"
    />
    <!-- 底部 -->
    <van-goods-action>
      <van-goods-action-icon icon="shop-o" text="首页" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="btn" />
      <van-goods-action-icon icon="star" text="收藏" color="#646566" />
      <!-- <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" /> -->
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="selectBuy"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="selectBuy"
      />
    </van-goods-action>
  </div>
</template>

<script>
import Goodsinfo from "../components/goodsdetail/Goodsinfo";
import Comment from "../components/goodsdetail/Comment";
import { findGoodsDetail, findGoodsComment } from "@/api/goodsdetail";
import { addCart } from "@/api/cart";
import Detailheader from "../components/goodsdetail/detailheader.vue";
import { Toast } from "vant";
export default {
  created() {
    this.getData();
    this.goodsId = this.$route.query.key;
  },
  //   keeplive避免了重复点击一个反复获取数据
  activated() {
    if (this.goodsId != this.$route.query.key) {
      this.getData();
      this.goodsId = this.$route.query.key;
    }
  },
  components: {
    Goodsinfo,
    Comment,
    Detailheader,
  },
  data() {
    return {
      url: window.location.href,
      active: 0,
      goodsInfo: {},
      goodsComment: [],
      commentCount: "评论(0)",
      goodsId: "",
      buy_count: 1,
      customStepperConfig: {
        handleStepperChange: (currentValue) => {
          // this.buy_count=currentValue;
          // console.log("currentValue: ", currentValue);
          this.buy_count = currentValue;
        },
      },
      //   商品规格
      show: false,
      quota: 5,
      sku: {
        // 数据结构见下方文档
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "型号", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "", // skuValueName：规格值名称
                imgUrl: "", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "", // 用于预览显示的规格类目图片
              },
            ],
            largeImageMode: true, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            price: 0, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 数据结构见下方文档
        // 默认商品 sku 缩略图
        picture: "https://img01.yzcdn.cn/1.jpg",
      },
    };
  },
  methods: {
    getData() {
      let goodsNoParam = { goodsNo: this.$route.query.key };
      findGoodsDetail(goodsNoParam).then((res) => {
        this.goodsInfo = res.data.message[0];
        this.goodsId = this.goodsInfo.goods_id;
        this.sku.tree[0].v[0].imgUrl = this.goodsInfo.image_url;
        this.sku.tree[0].v[0].previewImgUrl = this.goodsInfo.image_url;
        this.sku.tree[0].v[0].name = this.goodsInfo.short_name;
        this.sku.list[0].price = this.goodsInfo.price * 100;
        console.log("this.sku.list[0].price: ", this.sku.list[0].price);
        console.log("this.goodsInfo: ", this.goodsInfo);
      });
      let goodsIdParam = { goodsId: this.$route.query.key };

      findGoodsComment(goodsIdParam).then((res) => {
        this.goodsComment = res.data.message;
        this.commentCount = `评论（${res.data.message.length}）`;

        console.log("this.goodsComment: ", this.goodsComment);
      });
    },
    btn() {
      this.$router.push("/cart");
    },
    onClickIcon() {
      this.$router.push("/home");
    },
    selectBuy() {
      this.show = true;
    },
    onBuyClicked() {},
    onAddCartClicked() {
      // console.log(this.Goodsinfo);
      console.log("this.Goodsinfo?: ", this.goodsInfo);
      console.log(this.buy_count);
      let goodsParams = `goodsId=${this.goodsId}&goods_name=${this.goodsInfo.goods_name}&thumb_url=${this.goodsInfo.thumb_url}&price=${this.goodsInfo.price}&buy_count=${this.buy_count}`;
      console.log("goodsParams: ", goodsParams);
      addCart(goodsParams).then((res) => {
        console.log('res: ', res);
          Toast("已加入购物车");
          this.show = false;
      });
    },
  },
};
</script>

<style scoped>
.im {
  width: 100%;
}
.goodsdetail {
  width: 100%;
  height: 100%;
  background-color: #f7f8fa;
}

.tabs {
  margin-bottom: 2rem;
}
</style>