import Vue from 'vue'
import App from './App.vue'
import Chart from "chart.js";
import store from "./store"

Vue.config.productionTip = false
Vue.prototype.$Chart = Chart;



new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
