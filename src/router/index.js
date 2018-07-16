import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/shared/Layout'
import App from '../App'
import Landing from '../components/home/Landing'
import Login from '../components/user/Login'
import Register from '../components/user/Register'
import About from '../components/home/About'
import Logout from '../components/user/Logout'

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
      component: App,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
  ],
  mode: 'history'
})
