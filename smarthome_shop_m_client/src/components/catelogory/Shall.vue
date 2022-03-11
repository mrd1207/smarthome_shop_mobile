<template>
    <div class="shall">
        <GoodsCardS
        class="goods"
          v-for="(item, index) in cateList"
          :key="index"
          :detail="item"
        ></GoodsCardS>
    </div>
</template>

<script>
import GoodsCardS from '../common/goods-card-s.vue';
import Goods from "../common/goods.vue"
export default {
    components:{
        Goods,
        GoodsCardS
    },
    props:{
        cateList:Array
    },
     data() {
    return {
      goodsList: [],
    };
  },
}
</script>

<style scoped>
.shall{
  display: flex;
  flex-wrap: wrap;
}
.goods{
  margin-top: .2625rem;
}
</style>