// 以 API 的形式调用组件，以实现让组件挂在到 body 下显示
import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDeatil from 'components/header-detail/header-detail'
import ShopCartList from 'components/shop-cart-list/shop-cart-list'
import ShopCartSticky from 'components/shop-cart-sticky/shop-cart-sticky'
import Food from 'components/food/food'

createAPI(Vue, HeaderDeatil)
createAPI(Vue, ShopCartList)
createAPI(Vue, ShopCartSticky)
createAPI(Vue, Food)
