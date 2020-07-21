import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directives from '../package/index';
import '../package/styles/index.scss';

Vue.use(directives);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')