<template>
  <div class="main" @click="goDetail">
    <div class="main-items">
      <div class="image">
        <img v-lazy="detail.image_url" alt="" />
        <!-- {{item}} -->
      </div>
      <div class="maindo">
        <div class="title">{{ detail.goods_name }}</div>

        <div class="do">
          <div class="price">¥{{ detail.price }}</div>

          <div class="checkBtn">{{ detail.sales_tip }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: Object,
  },
  methods:{
      goDetail(){
          this.$router.push({
              name: "Goodsdetail",
              query: { key: this.detail.goods_id },
            });
      }
  }
};
</script>

<style scoped>
.main {
  width: 50%;
}
.main-items {
  margin: 0.125rem;
  border-radius: 0.1875rem;
  height: 7.5rem;

  box-shadow: 0px 0px 4px 1px rgb(180, 180, 180);
}
/* 图片盒子有白边，把图片设置为块 */
.image img {
  width: 100%;
  /* height: 3.725rem; */
  border-top-left-radius: 0.1875rem;
  border-top-right-radius: 0.1875rem;
  display: block;
}
.title {
  font-size: 0.3125rem;
  /*文本强制不换行*/
  /* white-space: nowrap; */
  /*文本溢出显示省略号*/
  text-overflow: ellipsis;
  /*溢出的部分隐藏*/
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.do {
    margin-top: .325rem;
  display: flex;
  justify-content: space-between;
}
.maindo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.1875rem;
  font-size: 0.4275rem;
  margin-bottom: 0.125rem;
}
.price {
  font-weight: bold;
  color: red;
  /* font-size: 0.475rem; */
}
.checkBtn {
  /* font-size: 0.4275rem; */
  color: rgb(145, 145, 145);
}
</style>