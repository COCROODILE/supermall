<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 插槽是用来动态替换 -->
    <!-- 使用具名插槽动态的决定元素内容 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot> <!-- 图片的活跃状态 -->
    </div>
    <!-- <slot :class="{ active: isAcitve }" name="item-text"></slot> -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'  //没有传值的情况下就用红色
    }
  },
  data() {
    return {
      // isAcitve: true
    }
  },
  computed: {
    isActive() {
      // this.$route:处于活跃状态的路由
      // 判断正在活跃的路径与四个item的路径是否有匹配
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick() {
      // console.log('itemClick');
      this.$router.replace(this.path)
    }
  }
}
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

.active {
  color: red
}
</style>