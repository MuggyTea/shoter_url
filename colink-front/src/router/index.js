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
import NotFound from '../components/pages/NotFound'
import MarkDownPanel from '../components/pages/MarkDownPanel'

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
},
{
  path: '*',
  component: NotFound
},
{
  path: '/panel',
  component: MarkDownPanel
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
