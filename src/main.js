import Vue from 'vue'
import App from './App.vue'
import './cube-ui'
// 使用 cube-ui createAPI
import './register'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
