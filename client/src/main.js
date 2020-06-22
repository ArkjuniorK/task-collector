import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import VueMq from 'vue-mq'

// import tailwind's css file
import './assets/css/tailwind.css'

// define VueMq breakpoint based on max-width
Vue.use(VueMq, {
  breakpoints: {
    // mb: 640,
    // tb: 786,
    // tblp: 1024,
    // lp: 1200,
    // dp: Infinity
    xs: 400,
    sm: 700,
    smmd: 800,
    md: 900,
    lg: 1200,
    xl: 1600,
    xxl: Infinity
  }
})

// sync the router with vuex store
sync(store, router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
