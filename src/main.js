import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex';
import { nlpStore } from "./stores/store";
import { broadcastChannels } from "./stores/BroadcastChannels";
import './plugins/element.js'
// import 'tailwindcss/tailwind.css';
// import axios from 'axios';
// import utils from "./mixins/utils";

Vue.use(Vuex);
// Vue.prototype.$http = axios;

const store = new Vuex.Store({
  modules: {
    a: nlpStore,
    broadcastChannels: broadcastChannels,
  }
});

Vue.config.productionTip = false
// Vue.mixin(utils);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
