<template>
  <div class="comment">
    <div class="commenttitle">
      <div class="user">
        <div class="usericon">
          <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="" />
        </div>
        <div class="rate">

          <div class="username" v-if="goodsComment.user_nickname">{{goodsComment.user_nickname}}</div>
          <div class="username" v-else>未命名</div>

          <van-rate
            v-model="value"
            :size="19"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </div>
      </div>
      <div class="time">2022-01-02</div>
    </div>
    <div class="content">
      {{goodsComment.comment_detail}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
      goodsComment:Object
  },
  data() {
    return {
      value: this.goodsComment.comment_rating,
    };
  },
};
</script>

<style scoped>
.comment {
  width: 93%;
  /* height: 3rem; */
  /* background-color: wheat; */
  background-color: #fff;
  border-radius: 0.2875rem;
  margin: 0.1875rem auto;
  padding: 0.225rem;
}
.usericon img {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
}
.user {
  display: flex;
  padding: 0.125rem;
}
.commenttitle {
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
}
.rate {
  padding-left: 0.3rem;
}
.content {
  margin-top: 0.1875rem;
  font-size: 0.4rem;
  padding-bottom: .125rem;
  color: rgb(134, 134, 134);
}
.time{
    padding: .1875rem;
    font-size: 0.4rem;
    color: rgb(204, 204, 204);
}
.username{
   font-size: 0.4rem; 
}
</style>