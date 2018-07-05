import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'

window.eventBus = new Vue()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
