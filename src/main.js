import Vue from 'vue'
import './plugins/vuetify'
import axios from 'axios'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.use(Vuelidate)

Vue.config.productionTip = false

// axios.defaults.baseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
axios.defaults.baseURL = 'https://temparanapi.aranproduk.com'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
