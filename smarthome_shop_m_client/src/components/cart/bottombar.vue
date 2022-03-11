<template>
  <div class="bottombar">
    <div class="sel">
      <van-checkbox @click="checkAllFun" v-model="checked" class="checkbox">
        <span>全选</span>
      </van-checkbox>
      <div class="title">
        <div class="count">共选择3件商品</div>
        <div class="price">合计: ¥2999</div>
      </div>

      <van-button round type="info" v-if="!isEdit">去结算 </van-button>
      <van-button round type="danger" plain v-else>删除 </van-button>
    </div>
  </div>
</template>

<script>
// import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {
    isEdit: Boolean,
  },

  computed: {
    // ...mapState({
    //   cartList: (state) => state.cart.cartList,
    //   selectList: (state) => state.cart.selectList,
    // }),
    // ...mapGetters(["isCheckedAll"]),
    isCheckedAll() {
      // return this.$store.getters.isCheckedAll;
      return false;
    },
    //  goodsList(){
    //       return this.selectList.map(id=>{
    //           return this.list.find(v=>v.id == id);
    //       })
    //   }
  },
  created(){
    this.len=this.$store.state.cart.cartList;
  },
  data() {
    return {
      result: [],
      checked: false,
      len:0
    };
  },
  computed: {},
  methods: {
    checkAllFun() {
      this.$store.state.cart.cartList.forEach((element) => {
        element.checked = false;
      });
      if(this.checked){
        this.$store.state.cart.cartList.forEach((element) => {
        element.checked = true;
      });
      }
      this.$store.state.cart.cartList.forEach((element) => {
        
        if(element.checked == false){
          this.checked=false;
          // console.log('this.$store.state.cart.cartList: ', this.$store.state.cart.cartList);
          //  this.$store.commit("cart/setCartList",this.$store.state.cart.cartList);
        }
        
      });

    },
  },
};
</script>

<style scoped>
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