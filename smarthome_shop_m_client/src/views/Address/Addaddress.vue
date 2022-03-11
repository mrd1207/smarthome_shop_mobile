<template>
  <div class="addaddress">
    <header>
      <van-nav-bar
        title="编辑地址"
        left-text="返回"
        right-text="按钮"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </header>
    <section>
      <van-address-edit
        :area-list="areaList"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave($event)"
        @change-default="changeDefault($event)"
      />

      <!-- <van-area title="标题" :area-list="areaList" /> -->
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
import { addAddress } from "@/api/address";

import { areaList } from "@vant/area-data";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      is_default: false,
      //   default: false,
    };
  },
  methods: {
    onSave(content) {
      //   console.log(this.default);

      //   console.log(' this.is_default: ',  this.is_default);
      console.log("content: ", content);
      let data = {
        real_name: content.name,
        tel: content.tel,
        street_name: content.addressDetail,
        province: content.province,
        city: content.city,
        county: content.county,
        is_default: this.is_default,
      };
      //   real_name tel street_name province city county is_default token
      addAddress(data).then((res) => {
        console.log("res: ", res);
        if (res.data.success_code == 200) {
          Toast("添加成功");
          this.$router.push("/address");
        } else {
          Toast("添加失败");
        }
      });
    },
    changeDefault(value) {
      value ? (this.is_default = 1) : (this.is_default = 0);
    },
    onClickLeft() {
      this.$router.push("/address");
    },
    onClickRight() {
      Toast("按钮");
    },
  },
};
</script>

<style scoped>
/* .addaddress{
  height: 100%;
  width: 100%;
}

header{
  position: fixed;
} */
section{
  margin-top: 1.2rem;
}
</style>