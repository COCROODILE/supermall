<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>
<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import {getHmoeMultidata} from 'network/home'
// import Swiper from '@/components/common/swiper/Swiper.vue'
// import SwiperItem from '@/components/common/swiper/SwiperItem.vue'
// import { Swiper,SwiperItem } from '@/components/common/swiper'
export default {
  name: 'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data(){
    return{
      banners:[],
      recommends:[]
    }
  },
  created(){
    // 1.请求多个数据
    getHmoeMultidata().then(res => {
      // console.log(res);
      this.banners=res.data.banner.list,
      this.recommends=res.data.recommend.list
    })
  }
}
</script>
<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
}
</style>