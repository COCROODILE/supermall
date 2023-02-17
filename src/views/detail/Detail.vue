<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" 
    @titleClick="titleClick"
    ref="nav"/>
    <scroll class="content" ref="scroll" 
    :probe-type="3"
    @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" /> 
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />

    <detail-bottom-bar @addCart="addToCart"/>
    <!-- <toast  /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "@/components/common/scroll/Scroll.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
// import Toast from 'components/common/toast/Toast'

import { getDetail, Goods, getRecommend } from "network/detail";
import {debounce} from '@/common/util'
import { itemListenerMixin,backTopMixin } from "@/common/mixin";

import { mapActions } from "vuex";
export default {
  name: "Datail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      message:'hhh',
      isShow:false
    };
  },
  mixins:[itemListenerMixin,backTopMixin],
  created() {
    // 保存传入的iid
    // this.iid = this.$route.params.iid;
    this.iid = this.$route.query.iid

    // 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // 获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 创建店铺信息
      // this.shop = new Shop(data.shopInfo);
      this.shop = data.shopInfo;

      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      /* this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      ); */
      this.paramInfo = data.itemParams;

      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // 最新的DOM已经被渲染出来，但是图片依然没有加载出来
      /* this.$nextTick(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
      }) */
    });
  
    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 给getThemeTopY赋值(进行防抖)
    this.getThemeTopY = debounce(()=>{
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    },100)
  },
  mounted(){
   
  },
  destroyed(){
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    // 监听详情的图片加载完成
    detailImageLoad() {
      // this.$refs.scroll.refresh();
      // 加载图片
      this.newRefresh()
      // 获取每个部分的offsetTop(在图片加载完之后)
      this.getThemeTopY()  
    },
    
    //点击标题滚动到相应内容
    titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },

    contentScroll(position){
      // 获取y值
      const positionY = - position.y 
      // postionY和标题中的值进行对比 
      let length = this.themeTopYs.length
      for(let i = 0; i < length; i++){
        if(this.currentIndex !== i && 
        ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
        || (i === length - 1 && positionY >= this.themeTopYs[i]))){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      this.isShowBackTop = (-position.y) > 1000
    },

    addToCart(){
      // 获取到购物车需要展示的商品的信息
      const product = {}
      product.img = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 将商品添加到购物车里
      /* this.$store.dispatch('addCart', product)
      .then(res => {
        console.log(res);
      })  */
      this.addCart(product).then(res => {
        /* this.isShow = true
        this.message = res

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        },1000) */ 

        this.$toast.show(res,1000)
      })
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  /* height: 100vh; */
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  background-color: #fff;
}
</style>