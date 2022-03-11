<template>
  <div>
    <Searcheader class="headers" ></Searcheader>

    <div class="search-history">
      <div class="search-t">
        <div>
          <i class="iconfont icon-shijian"></i>
          <span>历史搜索</span>
        </div>

        <span class="empty" @click="removeHistory">清空历史记录</span>
      </div>
      <ul class="history-c" v-if="searchArr.length">
        <li  v-for="(item, index) in  searchArr" :key="index" @click="goList(item)">{{item}}</li>
      </ul>
      <div v-else>暂无搜索记录...</div>
    </div>
  </div>
</template>

<script>
import Searcheader from "../../components/search/Searcheader";
import { MessageBox } from 'mint-ui';
export default {
    created(){
        this.searchArr = JSON.parse( localStorage.getItem('searchList')) || [];
    },
    
  data() {
    return {
    searchArr:[]
    };
    
  },
  components: {
    Searcheader,
  },
  methods:{
      removeHistory(){
          MessageBox({
			  title: '提示',
			  message: '是否删除历史操作记录?',
			  showCancelButton: true
			}).then(res=>{
                localStorage.removeItem('searchList');
                this.searchArr=[];
            })
      },
      goList(item){
          this.$router.push({
              name: "sList",

              query: { key: item },
            });
      }

  }
};
</script>

<style scoped>
.search-t {
  display: flex;
  justify-content: space-between;

  font-size: 0.4rem;
  padding: 0.25rem;
  color: gray;
}
.history-c {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  padding: 0 0.246666rem;

  color: gray;
}
.history-c li {
  margin: 0.266666rem;
  padding: 0.08rem 0.16rem;
  font-size: 0.373333rem;
  border: 1px solid #ccc;
  border-radius: 0.145rem;
}
.empty{
    color: rgb(70, 156, 255);
}
</style>