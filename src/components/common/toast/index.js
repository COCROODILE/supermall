import Toast from './Toast.vue'
const obj = {}

obj.install = function(Vue){
  // document.body.appendChild(Toast.$el)

  // 创建组件构造器
  const toastContructor = Vue.extend(Toast)

  // 通过new方式，根据组件构造器，创建出一个组件对象
  const toast = new toastContructor()

  // 将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj