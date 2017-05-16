import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Goods from '@/components/goods/goods'
import Sell from '@/components/sell/sell'
import Ratings from '@/components/ratings/ratings'
import Resours from 'vue-resource'

Vue.use(Router)
Vue.use(Resours)
// 创建路由实例并配置路由映射
// path:'*',redirect:'/home'  重定向到path是/home的映射
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/sell',
      name: 'sell',
      component: Sell
    },
    {
      path: '/ratings',
      name: 'ratins',
      component: Ratings
    }

  ]
})
