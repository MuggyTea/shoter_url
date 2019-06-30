// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
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
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(moment)
Vue.use(BootstrapVue)

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
