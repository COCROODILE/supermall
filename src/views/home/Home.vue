<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
        @tabClick="tabClick"
        :titles="['流行', '新款', '精选']"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed"
      />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper 
        :banners="banners"
        @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
        @tabClick="tabClick"
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- native修饰符：监听组件的原生事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
// import Swiper from '@/components/common/swiper/Swiper.vue'
// import SwiperItem from '@/components/common/swiper/SwiperItem.vue'
// import { Swiper,SwiperItem } from '@/components/common/swiper'
import { debounce } from "@/common/util";

import Scroll from "@/components/common/scroll/Scroll.vue";
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated(){
    // console.log('activated');
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    // console.log('deactivated');
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

  },
  mounted() {
    // 监听goodslistitem中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImageLoad", () => {
      // console.log('---');
      refresh();
    });

  },
  methods: {
    // 事件监听相关方法
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.refs.TabControl1.currentIndex=index
      this.refs.TabControl2.currentIndex=index
    },
    backClick() {
      // console.log('backClick');
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // console.log(position); 
      // 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    loadMore() {
      // console.log("加载更多方法");
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh()
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh是viewpoint height（视口高度） */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9; */
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.tab-control{
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .tab-control{
  position: relative;
  z-index: 9;
} */
</style>