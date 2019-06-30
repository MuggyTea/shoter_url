import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントのインポート
import LinkList from '../components/pages/LinkList'
import Login from '../components/common/Login'
import LinkPage from '../components/pages/LinkPage'
import NotFound from '../components/pages/NotFound'
import MarkDownPanel from '../components/MarkDownPanel'

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
  // {
  //   path: '/',
  //   component: LinkList
  // },
  {
    path: '/Login',
    component: Login
  },
  {
    path: '/page',
    name: 'LinkPage',
    component: LinkPage,
    props: true, // データの受け渡しを可能にする
    meta: {
      title: 'details of link'
    }
  },
  {
    path: '/',
    name: 'LinkList',
    component: LinkList,
    props: true,
    meta: {
      title: 'link list'
    }
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
