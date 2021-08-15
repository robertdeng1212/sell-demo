var path = require('path')
var config = require('../config')
var utils = require('./utils')
// 定义当前项目的根目录
var projectRoot = path.resolve(__dirname, '../')

// webpack 基本配置
module.exports = {
  // 入口配置
  entry: {
    // 编译的入口 js 文件
    app: './src/main.js'
  },
  // 输出配置
  output: {
    // 输出的文件路径
    path: config.build.assetsRoot,
    // 请求的静态资源绝对路径（/：根目录的路径）
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    // 输出的文件名称，[name] 对 entry 中的 key （app）,最终生成 app.js
    filename: '[name].js'
  },
  // 关于代码中使用 require 或 import 模块相关的配置
  resolve: {
    // 可在 require/import 中自动补全文件后缀
    extensions: ['', '.js', '.vue'],
    // 当前端 require/import 模块找不到时，则去 node_modules 中寻找
    fallback: [path.join(__dirname, '../node_modules')],
    // 配置别名，在 require 路径中可使用配置的别名，缩短字符串路径
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname, '../src/common'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    // 和 resolve 中的 fallback 功能一样
    fallback: [path.join(__dirname, '../node_modules')]
  },
  // 对某种类型的文件，应用某个 loaders 进行处理
  // 其实 webpack 编译阶段，就是利用各种 loaders 对各种文件做编译
  // 原理：扫描当前的工程目录，根据后缀名去匹配不同的文件，文件内容作为输入，对应的 loaders 对文件内容做一番处理，输出新的文件内容
  module: {
    // preLoaders 会在 loaders 之前处理，以下配置的作用是，对 vue 和 js 文件使用 eslint loader 进行处理
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        // 表示只对 projectRoot 目录下的文件进行编译
        include: projectRoot,
        // 表示排除这些目录
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        // 表示当文件图片大小小于10kb时，会生成 base64 字符串，打包到编译后的js文件，否则超过 10KB，则会单独生成一个文件
        query: {
          limit: 10000,
          // 生成文件名的规则，利用 utils.assetsPath 方法，[ext]表示扩展名
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 对字体文件进行编译
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // 当 eslint 检查到错误时，提示友好错误信息，并提供 eslint 的官网链接，可查看错误原因
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    // 关于 vue 文件中 css 处理的 loaders 
    loaders: utils.cssLoaders()
  }
}
