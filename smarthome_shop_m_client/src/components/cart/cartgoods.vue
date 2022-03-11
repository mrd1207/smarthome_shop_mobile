
<template>
  <div class="cartgoods">
    <div class="checkbox">
      <van-checkbox
        v-model="cartgoods.checked"
        v-on:change="onChange"
      ></van-checkbox>
    </div>
    <div class="imgs">
      <img :src="cartgoods.thumb_url" alt="" />
    </div>
    <div class="info">
      <div class="goodstitle">
        {{ cartgoods.goods_name }}
      </div>
      <div class="addBtn">
        <div class="price">{{ cartgoods.price }}</div>
        <!-- <div class="price">xxsx</div> -->
        <van-stepper v-bind:value="cartgoods.buy_count" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartgoods: Object,
    // checked: Boolean //接收外部传来的值
    //   disabled:Boolean
  },
   model: {
      // prop: "checked",
      event: "change" //要触发的事件
    },
  data() {
    return {
      value: 1,
    };
  },
  methods: {
    // cbox(e){
    //   // console.log('e: ', goods_id);
    //   this.$emit('goodsIndex',e.goods_id);
    // }
    onChange(e) {
      console.log('e: ', e);
      // this.$emit("change", e.target.checked);
    },
  },
};
</script>

<style scoped>
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
</style>