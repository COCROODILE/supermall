module.exports = {
  plugins:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth:375,  //视窗宽度，根据设计稿的宽度而定
      viewportHeight:667,  //视窗高度，根据设计稿的高度而定
      unitPrecision:5,  //指定px转换为视窗单位值的小数位数(很多时候无法整除)
      viewportUnit:'vw',  //指定需要转换为的视窗单位
      selectorBlackList:['ignore','tab-bar','tab-bar-item'], //指定不需要转换的类
      minPixelValue:1,  //小于或等于1px不转换为视窗单位
      mediaQuery:false,  //允许在媒体查询中转换px 
      exclude:[ /TabBar/ ]
    }
  }
}