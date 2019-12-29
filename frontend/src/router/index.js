import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Sell from '@/components/Sell'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/sell',
      name: 'Sell',
      component: Sell,
      // meta: {
      //   requiresAuth: true
      // }
    }
  ]
})
