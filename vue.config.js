module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/assets',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}