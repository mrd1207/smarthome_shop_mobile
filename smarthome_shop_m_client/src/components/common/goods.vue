<template>
  <div class="main-items" @click="goDetail">
    <div class="image">

      <img v-lazy="detail.image_url" />

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
.main-items {
  display: flex;
  /* background-color: hotpink; */
  height: 3.725rem;
  width: 100%;
  margin: 0.125rem;
  border-radius: 0.1875rem;
  box-shadow: 0px 0px 4px 1px rgb(180, 180, 180);
}
.image img {
  height: 3.725rem;
  border-top-left-radius: 0.1875rem;
  border-bottom-left-radius: 0.1875rem;
}
.title {
  font-size: 0.3125rem;
}
.do {
  display: flex;
  justify-content: space-between;
}
.maindo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.1875rem;
  font-size: 0.4875rem;
  margin-bottom: 0.125rem;
}
.price {
  font-weight: bold;
  color: red;
}
.checkBtn {
  font-size: 0.4275rem;
  color: rgb(145, 145, 145);
}
</style>