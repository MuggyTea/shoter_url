// import Vue from 'vue'
// import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// Vue.use(Router)

// export default new Router({
//   routes: [{
//     path: '/',
//     name: 'HelloWorld',
//     component: HelloWorld
//   }]
// })

import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントのインポート
import LinkList from '../components/pages/LinkList'
import Login from '../components/pages/Login'

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [{
  path: '/',
  components: LinkList
},
{
  path: '/Login',
  component: Login
}
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
  routes
})

// VueRouterインスタンスをエクスポートする
// main.jsでインポートする
export default router
