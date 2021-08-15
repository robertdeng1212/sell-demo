var config = require('../config')
var webpack = require('webpack')
// 合并配置文件
var merge = require('webpack-merge')
// 工具方法
var utils = require('./utils')
// 配置文件（开发时和运行时共享这份配置文件）
var baseWebpackConfig = require('./webpack.base.conf')
// 操作 HTML 文件的插件
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  // 启动热加载相关的代码，当改动源码，浏览器不用刷新也能看到改变后的效果，如果该过程失败了，会自动刷新浏览器
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    // 对独立 css 文件进行编译
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  // 方便开发时调试
  devtool: '#eval-source-map',
  // 定义插件
  plugins: [
    // 把源码中的 process.env 替换为 config.dev.env
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // webpack 优化相关插件，作用：根据打包后的模块使用频率，给进场使用的模块分配一个最小的 id，作用不大
    new webpack.optimize.OccurenceOrderPlugin(),
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),
    // 当编译出现错误，会跳槽这部分编译代码，使编译运行时的包不发生错误
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 关键：指定
    new HtmlWebpackPlugin({
      // 指定编译后生成的 html 文件名
      filename: 'index.html',
      // 指定要处理的模板，最终生产的文件还是同名 index.html
      template: 'index.html',
      // 表示在打包过程中输出的 js，css 文件的路径会自动添加到 index.html 文件中
      inject: true
    })
  ]
})
