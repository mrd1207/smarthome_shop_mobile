<template>
  <div class="main-haaders">
    <div class="search-return" @click="goBack">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="search-main">
      <i class="iconfont icon-fangdajing"></i>
      <form action="" onsubmit="return false" @keyup.enter="goSearch">
        <input
          type="search"
          placeholder="搜索您喜欢的产品..."
          v-model="searchVal"
        />
      </form>
    </div>

    <div class="searchBtn" @click="goSearch">搜索</div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "../../components/common/Tabbar.vue";
import { searchGoods } from "../../api/home";

export default {
  data() {
    return {
      searchVal: "",
      searchArr: [],
      searchResults: [],
    };
  },
  components: {
    Tabbar,
  },
  created() {
    this.searchVal = this.$route.query.key || "";
  },
  methods: {
    goBack() {
      this.$router.push("/home");
    },
    goSearch() {
      //判断有没有关键字
      // if(!this.searchVal)return;
      // //判断本地存储是否为空，之前没有就先初始化创建一个数组，否则就调用原先的数据展示
      // if(!localStorage.getItem('searchList')){
      //   localStorage.setItem('searchList','[]');
      // }else{
      //   this.searchArr=JSON.parse(localStorage.getItem('searchList'));
      // }
      // //增加数据
      // this.searchArr.unshift(this.searchVal);
      // // console.log(this.searchArr);

      // let newArr= new Set(this.searchArr);
      // localStorage.setItem('searchList',JSON.stringify(Array.from(newArr)));

      //如果搜索的关键字是没有的，那就直接return
      if (!this.searchVal) return;
      //判断之前有没有搜索的本地存储
      if (!localStorage.getItem("searchList")) {
        //没有
        localStorage.setItem("searchList", "[]");
      } else {
        //之前有
        this.searchArr = JSON.parse(localStorage.getItem("searchList"));
      }
      //增加数据
      // console.log(this.searchArr);
      this.searchArr.unshift(this.searchVal);
      //ES6去重
      let newArr = new Set(this.searchArr);
      //给本地存储赋值
      localStorage.setItem("searchList", JSON.stringify(Array.from(newArr)));
      //路径如果没有变化，不跳转页面
      // if( this.searchVal === this.$route.query.key  ) return;
      // this.$router.push({ name:'sList' ,query:{key:this.searchVal}});

      //搜索
      if (this.searchVal != "") {
        let keywordsParam = `keywords=` + this.searchVal;
        searchGoods(keywordsParam).then((res) => {
          
          if (res.data.success_code) {
            // this.searchResults=res.data.message;
            this.$emit("foo", res.data.message);
            this.$router.push({
              name: "sList",
              query: { key: this.searchVal },
              params: {
                slist: res.data.message,
              },
            });

            // console.log(res.data.message);
          }else if(res.data.error_code){
            console.log("you");
            this.$emit("foo", "暂无该商品");
            // console.log('res.data: ', res.data.error_code);
             this.$router.push({
              name: "sList",
              query: { key: this.searchVal },
              params: {
                noResult: String(res.data.error_code),
              },
            });
          }
          
        });
      }
    },
  },
};
</script>

<style scoped>
.main-haaders {
  background-color: #1d6cd5;
  width: 100%;
  height: 1.241rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-main {
  display: flex;
  align-items: center;
  width: 7.033333rem;
  height: 0.8rem;
  border-radius: 12px;
  background-color: #ffffff;
  padding-left: 0.3125rem;
}

.search-main form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: .4rem;
  padding-left: 0.1875rem;
}
.search-main form input {
  width: 100%;
  background: none;
  outline: none;
  border: 0px;
}
.searchBtn {
  font-size: 0.45rem;

  color: #ffffff;
  margin-right: 0.3125rem;
}
.search-return {
  color: #ffffff;
  font-size: 0.5rem;
  margin-left: 0.3125rem;
}
</style>