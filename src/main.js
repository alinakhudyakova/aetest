import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import store from '@/store';
import VueClipboards from "vue-clipboard2";

Vue.config.productionTip = false;
Vue.use(VueClipboards);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
