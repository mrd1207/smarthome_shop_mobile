<template>
  <div class="recommend">
    <Card><span>--推荐--</span></Card>
    <!-- <van-divider>推荐</van-divider> -->
    <div class="goods">
      <Goods
        v-for="(item, index) in Recomand"
        :key="index"
        :detail="item"
      ></Goods>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import Goods from "../common/goods.vue";
export default {
  components: { Card, Goods },
  props: {
    Recomand: Array,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.goods {

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.3625rem;
}

</style>