<template>
  <div class="goodsinfo">
    <div class="mian-price">
      <div class="price">¥{{goodsInfo.price}}</div>
      <!-- <van-count-down :time="30000000">
        <template #default="timeData">
          <span class="block">{{ timeData.hours }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.seconds }}</span>
        </template> -->
      </van-count-down>
    </div>

    <div class="title">
      {{goodsInfo.goods_name}}
    </div>
    <div class="saleinfo">
      <div>免邮费</div>
      <div class="salecount">{{goodsInfo.sales_tip}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      goodsInfo:Object
  },
};
</script>

<style scoped>
.goodsinfo {
  width: 93%;
  /* height: 3rem; */
  /* background-color: wheat; */
  background-color: #fff;
  border-radius: 0.2875rem;
  margin: 0.1875rem auto;
  padding: 0.225rem;
}
.price {
  font-weight: 600;
  color: red;
}
.mian-price{
    display: flex;
    justify-content: space-between;
}
.title {
  margin-top: 0.2075rem;
  font-size: 0.4rem;
  font-weight: 500;
}
.saleinfo {
  padding-right: 0.225rem;
  display: flex;
  justify-content: space-between;
  margin-top: 0.2075rem;
  font-size: 0.4rem;
  color: rgb(204, 204, 204);
}


/* 倒计时组件 */
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: .75rem;
  text-align: center;
  background-color: #ee0a24;
}
</style>