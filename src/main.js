import Vue from 'vue'
import './plugins/vuetify'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.use(Vuelidate)

Vue.config.productionTip = false

// axios.defaults.baseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
axios.defaults.baseURL = 'https://temparanapi.aranproduk.com'
// axios.defaults.headers.get['Authorization'] = $cookies.get("token")

axios.interceptors.request.use(config => {
    config.headers.common['Authorization'] = $cookies.get("token");
    return config;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
