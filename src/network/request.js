import axios from "axios";
export function request(config) {

  // 创建axios实例
  const instance = axios.create({
    baseURL: "http://152.136.185.210:7878/api/hy66" ,
    // baseURL:' www.blogry.cn/test/blog?title=我的编程经历',
    timeout: 5000
  })

  // axios的拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config
    // 拦截的作用
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时，都希望在界面中显示请求的图标
    // 某些网络请求（比如登录），必须携带一些特殊的信息（比如token）
  }, err => {
    console.log(err);
  })
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })

  // 发送网络请求
  return instance(config)

}


/* export function request(config) {
  return new Promise((resolve, reject) => {
    // 创建axios实例
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    })

    // 发送网络请求
    instance(config)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
} */


/* export function request(config, success, failure) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 发送网络请求
  instance(config)
    .then(res => {
      // console.log(res);
      success(res)
    }).catch(err => {
      // console.log(err);
      failure(err)
    })
} */
