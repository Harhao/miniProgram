import Vue from 'vue'
import Router from 'vue-router'
import UserGuide from '@/components/UserGuide'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserGuide',
      component: UserGuide
    }
  ]
})
