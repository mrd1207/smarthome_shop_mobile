<template>
  <swiper :options="swiperOption" class="swiper">
    <!-- {{swiperList1}} -->
    <swiper-slide v-for="(item, index) in swiperList" :key="index">
      <!-- <div>{{this.swiperList}}</div> -->
      <img :src="item.imgurl" alt="" />
    </swiper-slide>
    <!-- <div><img :src="swiperList1.imgurl" alt=""></div> -->
    <div class="swiper-pagination" slot="pagination"></div>
    <div
      class="swiper-button-prev swiper-button-white"
      slot="button-prev"
    ></div>
    <div
      class="swiper-button-next swiper-button-white"
      slot="button-next"
    ></div>
  </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "swiper-example-autoplay",
  title: "Autoplay",
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    swiperList: Array,
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
};
</script> 

<style scoped>
.swiper {
  /* position: relative; */
  /* top: 2.425rem; */
  /* margin-top: 2.241rem; */
  /* background-color: rgb(197, 139, 31); */
  height: 6rem;
  /* width: 100%; */
  overflow:hidden;
}

.swiper-slide img {
  height: 6rem;
  width: 100%;
  object-fit: cover;

}

::v-deep .swiper-pagination-bullet-active {
  background-color: #fff;
}
</style>