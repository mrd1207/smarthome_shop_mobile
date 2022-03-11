<template>
  <div class="list">
    <!-- <h1>list</h1> -->
    <Searcheader></Searcheader>
    <van-tree-select
      height="100%"
      :items="items"
      :main-active-index.sync="active"
      @click-nav="clickNav"
    >
      <template #content>
        <div v-for="(item, index) in cateItems" :key="index" >
          <div v-if="active === item.cate_id-1">
            <Shall :cateList="cateList"></Shall>
          </div>
        </div>
      </template>
    </van-tree-select>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "../components/common/Tabbar.vue";
import Searcheader from "../components/search/Searcheader";
import { Category } from "@/api/home";
// import Hall from '../components/catelogory/Hall.vue';
import Shall from '../components/catelogory/Shall.vue';

export default {
  name: "List",
  components: {
    Tabbar,
    Searcheader,
    Shall,
  },
  
    data() {
    return {
      active: 0,
      items: [],
      cateItems: [],
    };
  },
  created() {
    this.getData();
  },
    computed: {
    cateList() {
      return this.$store.state.category.list;
      
    },
  },
  methods: {
    getData() {
      Category().then((res) => {
        this.cateItems = res.data.message.slice(0, 5);
        console.log('this.cateItems: ', this.cateItems);
        for (let i = 0; i < 5; i++) {
          let obj = {};
          obj.text = this.cateItems[i].cate_name;
          this.items.push(obj);
        }
      });
      this.$store.dispatch("getList", {category:1});
    },
    clickNav(index){
      console.log('index: ', index);
      this.$store.dispatch("getList", {category:index+1});

    }
  },
};
</script>
<style scoped>
.list {
  width: 100%;
  height: 100%;
  /* background-color: #f5f5f5; */
  position: fixed;
  background-color: #f7f8fa;
}
.van-tree-select__content {
  background-color: #f7f8fa;
}
.van-sidebar-item--select[data-v-20863650] {
  background-color: #f7f8fa;
}
.van-sidebar-item--select:active {
  background-color: #f7f8fa;
}
.van-sidebar-item,.van-tree-select__nav {
  background-color: #fff;
}
.van-sidebar-item{
  border-radius: .1875rem;
}
.van-sidebar-item--select {
  color: #1d6cd5;
}
.van-sidebar-item--select::before{
  background-color: #1d6cd5;
}
.van-tree-select__nav-item[data-v-20863650] {
  padding-left:30px;

}

</style>

