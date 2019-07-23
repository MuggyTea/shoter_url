import '@babel/polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
// ルートコンポーネントをインポートする
import App from './App'
// ルーティングの定義をインポートする
import router from './router'
// firebase構成をインポートする
import './plugins/firebase'
// 状態管理のストアをインポートする
import store from './store'
// CSRF対策
// import '../static/js/bootstrap'
// CSS有効化
import moment from 'vue-moment'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min'

Vue.use(moment)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 他のコンポーネトから、this.$routerやthis.$storeという方法でルーターや洗濯したパラメータの情報にアクセスできる
  'router': router,
  'store': store,
  components: { App },
  template: '<App/>'
})
