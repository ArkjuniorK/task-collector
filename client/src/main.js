import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import VueMq from 'vue-mq'

// import tailwind's css file and fonts
import './assets/css/tailwind.css'
import 'typeface-roboto'
import 'typeface-roboto-condensed'

// define VueMq breakpoint based on max-width
Vue.use(VueMq, {
  breakpoints: {
    xs: 400,
    sm: 700,
    smmd: 800,
    md: 900,
    lg: 1200,
    xl: 1600,
    xxl: Infinity
  }
})

// sync the router with vuex store sync(store, router)
sync(store, router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
