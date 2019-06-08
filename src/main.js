import Vue from 'vue'
import Layout from './components/shared/Layout'
import router from './router'
import {store} from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

window.eventBus = new Vue()

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if not logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } 
  else if (to.matched.some(record => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    if (store.getters.loggedIn) {
      next({
        name: 'App'
      })
    } else {
      next()
    }
  }
  else {
    next() // make sure to always call next()!
  }
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Layout)
})
