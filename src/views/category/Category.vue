<template>
  <div class="wrapper">
    <ul class="content">
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
    </ul>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Category",
  data() {
    return {};
  },
  created() {
    let bs = new BScroll(".content", {});
  },
};
</script>
<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  overflow-y: scroll;
}
</style>