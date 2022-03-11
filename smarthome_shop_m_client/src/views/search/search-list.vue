<template>
  <div>
    <div class="headers">
      <Searcheader @foo="getSearchList"></Searcheader>
      <div class="sort">
        <div @click="defaults" :class='colorState==0?"active":""'>综合</div>
        <div @click="price">
          <div :class='colorState==1?"active":""'>{{ordericon}}</div>
        </div>
        <div>
          <div @click="ways" :class='colorState==2?"active":""'>{{ showWay }}</div>
          <!-- <div class="search-filter">
            <i class="iconfont icon-arrow_up_fat"></i>
            <i class="iconfont icon-arrow_down_fat"></i>
          </div> -->
        </div>
      </div>
    </div>
    <div class="demomain">
      <div v-if="wayState == 1" class="wa1">
        <div>{{ noResult }}</div>

        <Goodscard
          v-for="(item, index) in searchList"
          :key="index"
          :detail="item"
        ></Goodscard>
      </div>
      <div class="wa2" v-else-if="wayState == 0">
        <Goods
          v-for="(item, index) in searchList"
          :key="index"
          :detail="item"
        ></Goods>
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "../../components/common/Tabbar.vue";
import Searcheader from "../../components/search/Searcheader.vue";
import Goods from "../../components/common/goods";
import Goodscard from "../../components/common/goods-card";
import { searchGoods } from "../../api/home";
export default {
  created() {
    //点击搜索发送请求接受数据

    if (this.$route.params.slist) {
      this.searchList = this.$route.params.slist;
    }
    //刷新当前页重新发送请求 接受数据
    else {
      this.getData();
    }
  },
  data() {
    return {
      searchKey: "",
      searchList: [],
      showWay: "卡片",
      wayState: 1,
      noResult: "",
      orderName: "",
      order: "ASC",
      colorState: 0,
      ordericon:"价格"
      
    };
  },
  components: {
    Searcheader,
    Tabbar,
    Goods,
    Goodscard,
  },
  methods: {
    getData() {
      if (this.$route.query.key) {
        let keywordsParam =
          `keywords=` +
          this.$route.query.key +
          `&orderName=` +
          this.orderName +
          `&order=` +
          this.order;
        searchGoods(keywordsParam).then((res) => {
          // console.log("res.data.error_code: ", res.data.error_code);
          if (res.data.success_code === 200) {
            this.searchList = res.data.message;
          } else if (res.data.error_code) {
            this.noResult = "暂无该商品";
          }
        });
      }
    },
    getSearchList(searchList) {
    //   console.log("searchList: ", searchList);
      if (searchList == "暂无该商品") {
        this.noResult = "暂无该商品";
        this.searchList = [];
      } else {
        this.noResult = "";
        this.searchList = searchList;
      }
    },

    defaults() {
      this.colorState = 0;

      this.orderName = "";
      this.ordericon="价格↓"
      this.getData();
    },
    price() {
      this.colorState = 1;
      this.orderName = "price";
      if (this.order == "ASC") {
        this.order = "DESC";
        this.ordericon="价格↓"
      } else if (this.order == "DESC") {
        this.order = "ASC";
        this.ordericon="价格↑"
      }
      this.getData();
    },
    ways() {
      this.colorState = 2;
      if (this.wayState == 1) {
        this.wayState = 0;
        this.showWay = "列表";
      } else if (this.wayState == 0) {
        this.wayState = 1;
        this.showWay = "卡片";
      }
    },
  },
};
</script>

<style scoped>
.demo {
  height: 5.875rem;
  width: 49%;
  background-color: rgb(8, 148, 136);

  border: 1px solid white;
}
.demomain {
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  margin-top: 2.241rem;
  margin-bottom: 2.241rem;
}

.headers {
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0%;
}
.sort {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 1rem;
  /* background-color: hotpink; */
  font-size: 0.325rem;
  align-items: center;
  box-shadow: 0px 0px 4px 1px rgb(180, 180, 180);
  background-color: white;
}
.search-filter {
  display: flex;
  flex-direction: column;
  height: 0.1rem;
  margin-left: 0.0625rem;
}
.sort div {
  display: flex;
}
.icon-arrow_up_fat {
  font-size: 0.05rem;
}
.icon-arrow_down_fat {
  font-size: 0.05rem;
}
.wa1,
.wa2 {
  display: flex;
  flex-wrap: wrap;
}
.active {
    font-weight:bold;
  color: rgb(0, 153, 255);
}
</style>