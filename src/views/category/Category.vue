<template>
  <div class="wrapper">
    <ul class="content">
      <button @click="btnClick">按钮</button>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
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
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector(".wrapper"), {
      probeType: 3,
      pullUpLoad: true,
    });
    this.scroll.on("scroll", (position) => {
      console.log(position);
    });
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  },
  methods: {
    btnClick() {
      console.log("btnClick");
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  /* overflow-y: scroll; */
  overflow: hidden;
}
</style>