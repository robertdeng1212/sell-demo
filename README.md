# vue-sell

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 使用 webpack ContextReplacementPlugin 插件 解决 moment.js 包过大的问题

[ContextReplacementPlugin](https://v4.webpack.docschina.org/plugins/context-replacement-plugin/) 上下文(context) 与一个 [含有表达式的 require 语句](https://v4.webpack.docschina.org/guides/dependency-management/#require-with-expression) 相关，例如 `require('./locale/' + name + '.json')。`遇见此类表达式时，webpack 查找目录 (`'./locale/'`) 下符合正则表达式 (`/^.*\.json$/`)的文件。由于 `name` 在编译时(`compile time`)还是未知的，`webpack` 会将每个文件都作为模块引入到 `bundle` 中。

### vue.config.js 配置 ContextReplacementPlugin 插件

```JS
chainWebpack (config) {
  // 设置引用资源路径别名
  config.resolve.alias
    .set('components', resolve('src/components'))
    .set('common', resolve('src/common'))
    .set('api', resolve('src/api'))
    
  // 配置 moment.js 只打包中文语言包，以减少打包体积
  config.plugin('context')
    .use(webpack.ContextReplacementPlugin,
      [/moment[/\\]locale$/, /zh-cn/])
}
```

## 检验 webpack 配置是否成功

`vue inspect >> output1.js`

```JS
 output1.js
 
/* config.plugin('post-compile') */
new PostCompilePlugin(),
/* config.plugin('transform-modules') */
new TransformModulesPlugin(),
/* config.plugin('context') */
new ContextReplacementPlugin(
  /moment[/\\]locale$/,
  /zh-cn/
)
```
