<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
      @click.native="checkClick" class="check-button"/> 
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue';
import { mapGetters } from 'vuex';
export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      // if(this.cartList.length === 0) return false 
      // return !(this.cartList.filter(item => !item.checked).length) 

      /* if(this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked) */

      if(this.cartList.length === 0) return false
      for(let item of this.cartList){
        if(!item.checked){
          return false
        }
      }
      return true
    }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){ //全部选中
        this.cartList.forEach(item => item.checked = false);
      }else{  //有一部分未选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品')
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  font-size: 14px;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price{
  margin-left: 20px;
}
.calculate{
  width: 90px;
  height: 40px;
  background-color: red;
  text-align: center;
  color: #fff;
}
</style>