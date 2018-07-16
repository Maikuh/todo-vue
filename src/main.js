import Vue from 'vue'
import Layout from './components/shared/Layout'
import router from './router'
import {store} from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

window.eventBus = new Vue()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Layout)
})
