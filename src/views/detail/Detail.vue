<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'

import Scroll from '@/components/common/scroll/Scroll.vue'

import {getDetail,Goods,Shop,GoodsParam} from 'network/detail' 
export default {
  name:'Datail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
  },
  data(){
    return{
      iid: null,
      topImages: [],
      goods: {},
      shop:{},
      detailInfo:{},
      paramsInfo:{}
    }
  },
  created(){
    // 保存传入的iid
    this.iid = this.$route.params.iid

    // 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data=res.result
      // 获取顶部的图片轮播数据
      this.topImages=res.result.itemInfo.topImages
      
      // 获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      // 创建店铺信息
      this.shop=new Shop(data.shopInfo)

      // 保存商品的详情数据
      this.detailInfo=data.detailInfo

      // 获取参数信息
      this.paramsInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>