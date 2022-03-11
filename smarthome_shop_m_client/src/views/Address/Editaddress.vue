<template>
  <div class="editaddress">
    <header>
      <van-nav-bar
        title="编辑地址"
        left-text="返回"
        right-text="重置"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </header>
    <section>
      <van-address-edit
        :area-list="areaList"
        show-set-default
        show-search-result
        show-delete
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        save-button-text="修改地址"
        v-on:isDefault="is_default"
        :address-info="addressInfo"
        @save="onSave($event)"
        @delete="onDelete"
        @change-default="changeDefault($event)"
      />
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";
import { editAddress, deleteAddress } from "@/api/address";

import { areaList } from "@vant/area-data";
export default {
  created() {
    // this.$route.query
    if (this.$store.state.address.addressList[this.$route.query.key]) {
      //   console.log(" this.$route.query: ", this.$route.query.key);
      // console.log('this.$store.state.address.addAddress: ', this.$store.state.address.fullAddress[this.$route.query.key]);

      let addressObj =
        this.$store.state.address.addressList[this.$route.query.key];
      console.log("addressObj: ", addressObj);
      this.address_id = addressObj.addressId;
      // 设置默认信息
      this.addressInfo = {
        name: addressObj.name,
        tel: addressObj.tel,
        addressDetail: addressObj.street_name,
        // isDefault:false
      };
      //设置是否是默认地址
      this.addressInfo.isDefault = addressObj.isDefault;

      // 设置默认省市区
      for (const key in areaList.province_list) {
        if (Object.hasOwnProperty.call(areaList.province_list, key)) {
          if (areaList.province_list[key] == addressObj.province) {
            this.addressInfo.areaCode = key;
          }
        }
      }
      for (const key in areaList.city_list) {
        if (Object.hasOwnProperty.call(areaList.city_list, key)) {
          if (areaList.city_list[key] == addressObj.city) {
            this.addressInfo.areaCode = key;
          }
        }
      }
      for (const key in areaList.county_list) {
        if (Object.hasOwnProperty.call(areaList.county_list, key)) {
          if (areaList.county_list[key] == addressObj.county) {
            this.addressInfo.areaCode = key;
          }
        }
      }
    }
  },

  data() {
    return {
      areaList,
      searchResult: [],
      is_default: false,
      addressInfo: {},
      address_id: 0,
      //   default: false,
    };
  },
  methods: {
    onDelete() {
      let data = { address_id: this.address_id };
      deleteAddress(data).then((res) => {
        console.log("res: ", res);
        Toast("删除成功");
        this.$router.push("/address");
      });
    },
    onSave(content) {
      //   console.log(this.default);
      //   console.log(' this.is_default: ',  this.is_default);
      console.log("content: ", content);
      let data = {
        address_id: this.address_id,
        real_name: content.name,
        tel: content.tel,
        street_name: content.addressDetail,
        province: content.province,
        city: content.city,
        county: content.county,
        is_default: this.is_default,
      };
      //   real_name tel street_name province city county is_default token
      editAddress(data).then((res) => {
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
      console.log("value: ", value);
      value ? (this.is_default = 1) : (this.is_default = 0);
    },
    onClickLeft() {
      this.$router.push("/address");
    },
    onClickRight() {
      this.addressInfo = {};
      Toast("已重置数据");
    },
  },
};
</script>

<style scoped>
</style>