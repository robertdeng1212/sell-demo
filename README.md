# sell

> sell app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 安装 Vue 1.0 版本项目

由于Vue.js现在主推的是2.0，所以Vue-cli脚手架也升级为默认安装2.0版本的Vue.js项目。但是我们可以指定版本安装，在控制台执行脚本如下：

```JS
vue init webpack#1.0 projectname
```

其中，projectname 是项目名称，可以是任意合法的字符串。

## better-scroll不能滚动？

better-scroll的滚动原理，dom结构至少需要2层。外层容器需要有固定的大小（宽度或高度），作为视口；内层容器的大小是由内容撑开的，当内层高度或宽度超过外层视口的时候，才会产生滚动。
所以首先需要检查内外层的尺寸，其次是在Vue.js里，我们改变数据，dom并不会立刻改变，通常会在下一个Event Loop，通常我们说的nextTick去更新。而我们的better-scroll是依赖dom的。所以，当数据变化映射的dom和better-scroll相关的时候，我们通常需要在vm.$nextTick的回调函数里初始化或者刷新better-scroll。

## 参考

[Vue.js 官网](https://vuejs.org.cn/)

[Vue-cli 官网](https://github.com/vuejs/vue-cli)

[Vue-resource](https://github.com/vuejs/vue-resource)

[Vue-router](https://github.com/vuejs/vue-router)

[better-scroll](https://github.com/ustbhuangyi/better-scroll)

[webpack官网](http://webpack.github.io/)

[Stylus中文文档](http://www.zhangxinxu.com/jq/stylus/)

[es6入门学习](http://es6.ruanyifeng.com/)

[eslint规则](http://eslint.org/docs/rules/)

[设备像素比](http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/)

[Flex布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)

[贝塞尔曲线测试](http://cubic-bezier.com/)

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
