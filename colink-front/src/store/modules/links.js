import firestore from '../../plugins/firebase'
import { ADD, REMOVE } from './mutation-types'
/**
 * リンクページ一覧のストアモジュール
 * リンク詳細ページで表示するリンクの配列を管理する
 */

// DBを呼び出す
const LinkRef = firestore.collection('LinkList')
const TwitterUser = firestore.collection('Users')

export default {
  namespaced: true,
  unsubscribe: null,
  state () {
    return {
      // 配列
      data: []
      //   create_num: 0
    }
  },
  mutations: {
    // 受け取ったデータpayloadをステートに格納
    init (state, payload) {
      state.data = payload
    },
    // リンク追加時
    [ADD] (state, payload) {
      console.log('add')
      // DBから受け取ったデータをステートにセット
      state.data.push(payload)
    },
    add_linkid (state, payload) {
      console.log('add link_id')
      // link_idを追加で更新する
    },
    // 呼び出すとき
    set (state, payload) {
      const index = state.data.findIndex(link => link.id === payload.id)
      if (index !== -1) {
        state.data[index] = payload
        state.data.push(payload)
      }
    },
    // 削除時
    [REMOVE] (state, payload) {
      const index = state.data.findIndex(link => link.id === payload.id)
      if (index !== -1) {
        state.data.splice(index, 1)
      }
    }
  },
  // コンポーネントはゲッターを通して状態監視する
  getters: {
    data (state) {
      return state.data
    }
  },
  actions: {
    clear ({ commit }) {
      commit('init', [])
    },
    // リスナーの起動
    startListener ({ commit }) {
      if (this.unsubscribe) {
        console.warn('listener is already running. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
      // firestoreからデータを検索する
      this.unsubscribe = LinkRef.orderBy('createAt', 'asc').onSnapshot(querySnapshot => {
        // データが更新されるたびに呼び出される
        querySnapshot.docChanges().forEach(change => {
          console.log('links.js')
          console.log(change.doc.data())
          // 時刻がnullのものは表示しない
          if (!change.doc.data().createAt) {
            console.log(change.doc.data())
            return
          }
          const payload = {
            id: change.doc.id,
            link_id: (change.doc.id).substr(0, 4),
            create_num: change.doc.data().create_num,
            link_title: change.doc.data().link_title,
            description: change.doc.data().description,
            platforms: change.doc.data().platforms,
            million: change.doc.data().million,
            createAt: new Date(change.doc.data().createAt.seconds * 1000),
            photo: change.doc.data().photo
          }
          console.log('add link_id')
          LinkRef.doc(change.doc.id).update({
            'link_id': payload.link_id
          })
          console.log(payload)
          // ミューテーションを通してステートを更新する
          if (change.type === 'added') {
            console.log('change.type add', change.type)
            commit(ADD, payload)
          } else if (change.type === 'modified') {} else if (change.type === 'removed') {
            commit('REMOVE', payload)
          }
        })
      },
      (error) => {
        console.error(error.name)
      })
    },
    // リスナーの停止
    stopListener () {
      if (this.unsubscribe) {
        console.log('listener is stopping ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
    },
    addLink ({ commit }, payload) {
      console.log('addLink now')
      LinkRef.add(payload)
        .then(doc => {
          // ミューテーションの外でステート管理しない
        })
        .catch(err => {
          console.error('Error adding document: ', err)
        })
    },
    deleteLink ({ commit }, payload) {
      LinkRef.doc(payload.id).delete()
        .then(() => {

        })
        .catch(err => {
          console.error('Error removing document: ', err)
        })
    }
  }
}
