// 提供文件路径操作的方法，node.js 的 API
var path = require('path')
// node 框架，用于启动 webServe
var express = require('express')
// 核心编译工具
var webpack = require('webpack')
// 配置文件
var config = require('../config')
// http 协议代理中间件，代理、转发一些 api
var proxyMiddleware = require('http-proxy-middleware')
// webpack 相关配置，分为开发、生产环境配置
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
// 定义端口号
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 获取需要代理的接口
var proxyTable = config.dev.proxyTable

// 启动 express
var app = express()

// 读取本地 mock 数据
var appData = require('../data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

// 定义路由
var apiRoutes = express.Router();

// 编写接口
apiRoutes.get('/seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get('/goods', function(req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get('/ratings', function(req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

// 使用路由中间件
app.use('/api', apiRoutes);

// 调用webpack编译
var compiler = webpack(webpackConfig)

// webpack-dev-middleware 中间件，会把编译好的文件放在内存中，非常强大
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

// webpack-hot-middleware 热加载配合的中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// 转发相关的操作
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  // 使用 proxyMiddleware 中间件
  app.use(proxyMiddleware(context, options))
})

// 以下为使用中间件
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// 配置静态资源访问路径
// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// 启动 express，监听 8080 端口
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
