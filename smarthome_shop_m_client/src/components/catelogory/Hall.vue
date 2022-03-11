<template>
    <div class="hall">
        <Goods
        class="goods"
          v-for="(item, index) in cateList"
          :key="index"
          :detail="item"
        ></Goods>
    </div>
</template>

<script>
import Goods from "../common/goods.vue"
export default {
    components:{
        Goods
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

</style>