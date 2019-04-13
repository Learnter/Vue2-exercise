// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import reset from "reset-css";
import Mint from "mint-ui";
import 'mint-ui/lib/style.css';
import"./assets/css/iconfont.css";//引入字体库样式
import"../static/common.js";//移动端适配方案;

Vue.use(Mint);

Vue.use(reset);

Vue.prototype.$axios = axios;

Vue.filter("filterValue",function(value){
  return value / 100;
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
