import Vue from "vue";
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)

// 创建Store对象
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  getters:{
    cartLength(state){
      return state.cartList.length
    },
    cartList(state){
      return state.cartList
    }
  },
  // mutations:修改state中的状态，里面的方法尽可能完成的事件比较单一
  mutations:{
    addCounter(state,payload){
      payload.count ++
    },
    addToCart(state,payload){
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions:{
    addCart(context,payload){
      return new Promise((resolve,reject) => {
        // 查询之前的数组中是否添加该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        // 判断oldProduct
        if(oldProduct){
          context.commit('addCounter',oldProduct)
          resolve('当前商品数量+1')
        }else{
          payload.count = 1
          context.commit('addToCart',payload)
          resolve('添加了新商品')
        }
      })
    }
  }
})

// 挂载到Vue实例上
export default store