<template>
  <div class="addresslist">
    <header>
      <van-nav-bar
        title="地址列表"
        left-text="返回"
        right-text="设为默认地址"
        left-arrow
        fixed
        @click-left="onClickLeft"
        @click-right="onClickRight(list, chosenAddressId)"
      />
    </header>
    <section>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="selectAddress"
      />
      <van-empty v-if="list.length == 0" description="暂无地址" />
    </section>
  </div>
</template>

<script>
import { Toast } from "vant";

import { findAddressList } from "@/api/address";
import { setDefaultAddress } from "@/api/address";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  created() {
    this.getData();
  },
  data() {
    return {
      chosenAddressId: "1",
      list: [],
    };
  },
  computed: {
    ...mapState({
      fullAddress: (state) => state.address.fullAddress,
    }),
  },
  methods: {
    getData() {
      this.$store.dispatch("AddressLists").then(() => {
        console.log(" this.$store.state.fullAddress: ", this.fullAddress);
        if (this.fullAddress.length == 0) return;
        // this.$store;
        let tempList = [];
        for (let i = 0; i < this.fullAddress.length; i++) {
          let obj = {
            id: i + 1,
            name: this.fullAddress[i].real_name,
            tel: this.fullAddress[i].tel,
            address: `${this.fullAddress[i].province}${this.fullAddress[i].city}${this.fullAddress[i].county}${this.fullAddress[i].street_name}`,
            addressId: this.fullAddress[i].address_id,
            userId: this.fullAddress[i].id,
            city: this.fullAddress[i].city,
            county: this.fullAddress[i].county,
            province: this.fullAddress[i].province,
            street_name: this.fullAddress[i].street_name,
            isDefault: false,
          };
          if (this.fullAddress[i].is_default) {
            obj.isDefault = true;
          }

          tempList.push(obj);
          // 将默认地址放在第一个
          if (tempList[i].isDefault) {
            tempList[i].id = 1;
            // this.chosenAddressId = tempList[i].id;
            let tempObj = tempList[i];
            // console.log("tempObj: ", tempObj.id);
            // tempObj.id=1;
            for (let j = tempList.length - 2; j >= 0; j--) {
              tempList[j + 1] = tempList[j];
              tempList[j].id++;
            }

            tempList[0] = tempObj;
          }
        }
        this.$store.commit("setAddressList", tempList);
        this.list = this.$store.state.address.addressList;
        console.log(" this.list: ", this.list);

        this.chosenAddressId = this.list[0].id;
      });
    },
    onClickLeft() {
      if (this.$route.query.type == "select") {
        this.$router.back();
      } else {
        this.$router.push("/user");
      }
    },
    onClickRight(arr, chosenAddressId) {
      console.log("arr: ", arr);
      console.log(chosenAddressId);
      // if(!addId) return;

      let data = arr.filter((addId) => addId.id == chosenAddressId)[0];
      setDefaultAddress(data).then((res) => {
        this.getData();
        Toast("设为默认地址成功");
      });
    },
    onAdd() {
      console.log(this.list.length);
      if (this.list.length < 20) {
        this.$router.push("/address/addaddress");
      } else {
        Toast("最多添加20条地址");
      }
    },
    onEdit(item, index) {
      this.$router.push({
        name: "Editaddress",
        query: { key: index },
      });
      // this.$router.push("/address/editaddress/" + );

      // Toast("编辑地址:" + index);
    },
    selectAddress(item, index) {
      if (this.$route.query.type == "select") {
        // let addressItem = JSON.parse(
        //   JSON.stringify(item).replace(/name/g, "real_name")
        // );
        item.real_name=item.name;
        this.$store.commit("setOrderAddress", item);

        this.$router.back();
      }
      console.log("item,index: ", item, index);

      // console.log(121);
    },
    // clickItem(){
    //   // item, index
    //   console.log('item, index: ', item, index);
    // }
  },
};
</script>

<style scoped>
section {
  margin-top: 1.2rem;
}
</style>