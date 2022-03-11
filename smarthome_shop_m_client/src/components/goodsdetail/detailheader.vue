<template>
  <div class="header">
    <div class="detail">
      <!-- <div class="back">返回</div> -->
      <van-icon name="arrow-left" @click="onClickLeft"/>
      <div class="title">商品详情</div>
      <van-icon name="share-o" @click="onClickRight(url)"/>
      <!-- <div class="share">分享</div> -->
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight(data) {
      let oInput = document.createElement("input");
      oInput.value = data;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      Toast("已经复制商品链接");
      oInput.remove();
    },
  },
  data() {
    return {
      url: window.location.href,
    };
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 1.275rem;
  position: fixed;
  background-color: #fff;

  z-index: 2;
}
.detail {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.4rem;
  font-size: 0.43rem;
  color: rgb(95, 95, 95);
}
</style>