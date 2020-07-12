import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LayoutIndex from '@/components/layout/Index'
import scm from './module/scm'
import baseinfo from './module/baseinfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: LayoutIndex
    },
    ...scm,
    ...baseinfo
  ]
})
