<template>
  <div class="home">

    <div class="headers">
      <Header></Header>
      <ly-tab
        v-model="selectedId"
        :items="lyList"
        :options="options"
        @change="changeTab"
      >
      </ly-tab>
    </div>
  <!-- <div class="headerb"></div> -->
    <section ref="wrapper" class="wrapper">
      <div v-if="index == 0">
        <Swiper :swiperList="swiperList"></Swiper>
        <Icons :cateInfo="cateItems"></Icons>
        <Recomand :Recomand="Recomand"></Recomand>
        <Like :Like="Like"></Like>
      </div>
      <div v-else>
        <Hall :cateList="cateList"></Hall>
      </div>
    </section>
    <!-- <div>{{ cateList }}</div> -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "../components/common/Tabbar.vue";
import Header from "@/components/home/Header.vue";
import Swiper from "@/components/home/Swiper.vue";
import Icons from "@/components/home/Icons.vue";
import Recomand from "../components/home/Recomand.vue";
// import BetterScroll from "better-scroll";
import Like from "@/components/home/Like.vue";
import { findBanner, Category, Homeshoplist } from "@/api/home";
import Hall from "../components/catelogory/Hall.vue";

// import { useStore } from "vuex";
// import Like from '../components/home/Like.vue'
// const store = useStore();
export default {
  name: "Home",
  components: {
    Tabbar,
    Header,
    Swiper,
    Icons,
    Recomand,
    Like,
    Hall,
  },
  mounted() {},
  created() {
    this.getData();
  },
  computed: {
    // ...mapState(["list"]),
    cateList() {
      return this.$store.state.category.list;
    },
  },
  methods: {
    getData() {
      findBanner().then((res) => {
        this.swiperList = res.data.message;
      });
      Category().then((res) => {
        this.cateItems = res.data.message.slice(0, 5);
        //data中直接初始化lyList:[{cate_name:"首页"}]会造成只有首页一个tab，之后其他cate_name虽然也加上去了，只是功能有了，但是他的拖动效果还是挺溜在页面创建之前
        //如果之后添加数据，则要一起添加，初始化要为空数组
        this.lyList.push({ cate_name: "首页" });
        for (let i = 0; i < 5; i++) {
          let obj = {};
          obj.cate_name = this.cateItems[i].cate_name;
          this.lyList.push(obj);
          // console.log(" this.lyList: ", this.lyList);
        }
      });
      Homeshoplist().then((res) => {
        this.Recomand.push(...res.data.message[0], ...res.data.message[1]);
        this.Like.push(
          ...res.data.message[2],
          ...res.data.message[3],
          ...res.data.message[4]
        );
      });
      // 当dom都加载完毕了再去执行
      // this.$nextTick(() => {
      //   this.oBetterScroll = new BetterScroll(this.$refs.wrapper, {
      //     movable: true,
      //     zoom: true,
      //   });
      // });
    },
    changeTab(item, index) {
      console.log("index: ", index);
      //  this.$store.dispatch("getList",(index+1)).then(data=>{
      //    this.$store.commit('setList', data);
      //  })
      this.$store.dispatch("getList", { category: index });
      this.index = index;
    },
  },
  data() {
    return {
      index: 0,
      selectedId: 0,
      cateItems: [],
      swiperList: [],
      Recomand: [],
      Like: [],
      oBetterScroll: "",
      options: {
        activeColor: "#1d98bd",
        labelKey: "cate_name",
        // fixBottom:true
        // 可在这里指定labelKey为你数据里文字对应的字段
      },
      lyList: [],
    };
  },
};
</script>

<style scoped>

.headers {
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0%;
}

.home {
  margin-top: 2.41rem;
  /* display: flex; */

  /* flex-direction: column; */
}
.wrapper{
  flex: 1;
}

</style>
 