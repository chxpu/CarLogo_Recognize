import Vue from 'vue'
import App from './App'

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import VueResource from 'vue-resource'

// 注册全局组组件
Vue.use(ElementUI);
Vue.use(VueResource);

Vue.config.productionTip = false;

Vue.http.options.headers = {
  'Prediction-Key': '112f8f6e5cd04cbba81706d9318cfa82'
  // 'Content-Type': 'application/json'
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
