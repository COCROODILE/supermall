<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import CartList from './childComps/CartList.vue';
import CartBottomBar from './childComps/CartBottomBar.vue';
import { mapGetters } from 'vuex'; 
export default {
  name: 'Shopcart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    ...mapGetters({
      length:'cartLength'
    })
    // ...mapGetters(['cartLength'])
  }
}
</script>
<style scoped>
  .cart{
    height: 100vh;
    position: relative;
  }
  .nav-bar{
    color: #fff;
    background-color: var(--color-tint);
    position: relative;
  }
</style>