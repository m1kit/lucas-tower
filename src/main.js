import Vue from 'vue'
import Buefy from 'buefy';
import AsyncComputed from 'vue-async-computed'
import WorkerPool from 'workerpool'

import '@mdi/font/css/materialdesignicons.css'
import 'buefy/dist/buefy.css'

import App from './App.vue'

Vue.prototype.$worker = WorkerPool.pool('./js/worker.js', {maxWorkers: 3});
Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(AsyncComputed);

new Vue({
  render: h => h(App),
}).$mount('#app');
