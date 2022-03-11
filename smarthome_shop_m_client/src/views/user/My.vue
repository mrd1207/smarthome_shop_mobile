<template>
  <div class="my">
    <!-- 导航 -->
    <van-nav-bar title="我的" />
    <!-- 背景 -->
    <div class="background">
      <!-- <div>注册</div> -->
      <div class="loginBtn" v-if="!profiles.id" @click="goLogin">登录</div>
      <div v-else class="userinfo">
        <img :src="profiles.user_avatar" alt="" />
        <div class="user_nickname">{{ profiles.user_nickname }}</div>
      </div>
    </div>
    <!-- 我的订单 -->
    <div class="myorder">
      <div class="headorder">
        <div class="ordertitle">我的订单</div>
        <div class="orders">
          <div class="allorder">查看全部订单</div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="orderstate">
        <div class="orderc">
          <van-icon name="description" class="icon" />
          <div class="ordername">未付款</div>
        </div>
        <div class="orderc">
          <van-icon name="records" />
          <div class="ordername">未发货</div>
        </div>
        <div class="orderc">
          <van-icon name="completed" />

          <div class="ordername">已发货</div>
        </div>
        <div class="orderc">
          <van-icon name="sign" />
          <div class="ordername">待评价</div>
        </div>
      </div>
    </div>
    <!-- 菜单 -->
    <div class="group">
      <van-cell title="全部订单" is-link to="home" />
      <van-cell title="个人资料" is-link to="home" />
      <van-cell title="地址管理" is-link to="/address" />
      <van-cell title="我的收藏" is-link to="home" />
      <van-cell title="设置" is-link to="/user/setting" />
    </div>
    <!-- <div>{{address}}</div> -->
    
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "../../components/common/Tabbar.vue";
import { mapState } from "vuex";
export default {
  name: "My",
  data() {
    return {
      // profile:{}
    };
  },
  components: {
    Tabbar,
  },
  created() {
    // this.profile=this.$store.state.user.profile;
    // console.log('this.profiles: ',this.$store.state.user.profile);
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },

  },
  computed: {
    profiles() {
      return this.$store.state.user.profile;
    },
    address(){

      return this.$store.state.address.addressList;
      
    }
  },
};

/* justify-content: ce */
</script>


<style scoped>
.my {
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: #f7f8fa;
}
.group {
  width: 90%;
  margin: 0.625rem auto;
  padding: 0.2rem;
  border-radius: 0.1875rem;
  /* border-radius: 1rem; */
  background-color: #fff;
}

.background {
  width: 100%;
  height: 4.125rem;
   background: #edc0bf;
  background: linear-gradient(90deg, #edc0bf 0,#c4caef 58%);
  background-color: rgba(79, 176, 255, 0.7);
  -webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginBtn {
  width: 1.875rem;
  background-color: white;
  font-size: 0.4rem;
  padding: 0.2125rem 0.3rem;
  border-radius: 0.15rem;
  display: flex;
  justify-content: center;
}
.userinfo{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userinfo .user_nickname {
  padding:0 .9rem ;
  /* margin: 0 auto; */
  margin-top: 0.125rem;
  color: #fff;
  font-size: 0.4rem;
}
.userinfo img {
  width: 2rem;
  height: 2rem;
  border:.125rem solid white;
  border-radius: 50%;
}
.myorder {
  background-color: #fff;
  height: 2.8rem;
  border-radius: 0.1875rem;
  width: 95%;
  margin: 0.3rem auto;
}
.headorder {
  display: flex;
  justify-content: space-between;
  font-size: 0.38rem;
  padding: 0.3rem;
}
.orders {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.orderstate {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 0.2rem;
}
.ordername {
  font-size: 0.2rem;
}
.icon {
  margin: 0 auto;
}
.orderc {
  height: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>