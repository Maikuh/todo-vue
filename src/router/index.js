import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/shared/Layout'
import App from '../App'
import Landing from '../components/home/Landing'
import Login from '../components/user/Login'
import Register from '../components/user/Register'
import About from '../components/home/About'

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
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ],
  mode: 'history'
})
