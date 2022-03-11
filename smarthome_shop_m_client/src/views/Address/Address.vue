<template>
  <div class="address">
    <!-- <router-vuew></router-vuew> -->
    <router-view>
    </router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f7f7f7");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style scoped>
</style>