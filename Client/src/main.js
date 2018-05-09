import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import axios from 'axios'

import App from './App.vue'
import { routes } from './routes'
import store from './store/store'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(VueRouter)

const baseURL = process.env.NODE_ENV === 'production' ? process.env.API_URL : 'http://localhost:3000'

Vue.prototype.$http = axios
axios.defaults.baseURL = baseURL
axios.defaults.validateStatus = false

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name == 'verify') {
    store.dispatch('setLinkValidated', false)

    let params = {
      key: to.params.key
    }

    axios.post('/verifylink', params)
    .then(response => {
      if (response.status === 200 && response.data.success) {
        store.dispatch('setLinkValidated', true)
        store.dispatch('setName', response.data.data.first)
        store.dispatch('setWatched', response.data.data.watched == 1 ? true : false)

        next()
      } else {
        store.dispatch('setError', 'The url you provided is not valid or you have previously accepted the Annual Student Review.')

        next('/error')
      }
    }, error => {
      store.dispatch('setError', 'Sorry, unable to connect to the server. Try again later!')
      
      next('/error')
    });
  }

    next()
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})