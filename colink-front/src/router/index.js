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
import LinkPage from '../components/pages/LinkPage'

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [{
  path: '/',
  component: LinkList
},
{
  path: '/Login',
  component: Login
},
{
  path: '/page',
  component: LinkPage
}
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
  mode: 'history',
  routes
})

// VueRouterインスタンスをエクスポートする
// main.jsでインポートする
export default router
