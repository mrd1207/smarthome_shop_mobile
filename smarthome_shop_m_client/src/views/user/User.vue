<template>
  <div class="user">
    <router-view>
    </router-view>
    <!-- <Tabbar></Tabbar> -->
  </div>
</template>

<script>

// import Tabbar from "../components/common/Tabbar.vue";



export default {
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f7f7f7");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  components: {
    // Tabbar,

  },
};
</script>

<style scoped>

</style>