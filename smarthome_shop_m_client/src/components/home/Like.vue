<template>
  <div class="Like">
    <Card>
      <span class="like">猜你喜欢</span>
    </Card> 
    <div class="mainitems">
       <Goodscard
          v-for="(item, index) in Like"
          :key="index"
          :detail="item"
    ></Goodscard>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import Goodscard from "../common/goods-card.vue";

export default {
  components: { Card ,Goodscard},
     props: {
    Like: Array,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.mainitems{
  display: flex;
  flex-wrap: wrap;
  margin-top: .3rem;
  margin-bottom: 2.25rem;
  
}
.like{
  padding: .625rem;
  font-size: .5rem;
}

</style>
