import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueMq from 'vue-mq'

import './assets/css/tailwind.css'

Vue.use(VueMq, {
  breakpoints: {
    // mb: 640,
    // tb: 786,
    // tblp: 1024,
    // lp: 1200,
    // dp: Infinity
    xs: 500,
    sm: 700,
    md: 900,
    lg: 1200,
    xl: 1600,
    xxl: Infinity
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
