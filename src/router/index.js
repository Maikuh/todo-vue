import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/shared/Layout'
import App from '../App'
import Landing from '../components/home/Landing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/todo',
      name: 'App',
      component: App
    }
  ]
})
