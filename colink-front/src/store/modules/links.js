import firestore from '../../plugins/firebase'
import { ADD, REMOVE } from './mutation-types'
/**
 * リンクページ一覧のストアモジュール
 * リンク詳細ページで表示するリンクの配列を管理する
 */

// DBを呼び出す
const LinkRef = firestore.collection('LinkList')
// const TwitterUser = firestore.collection('Users')

export default {
  namespaced: true,
  unsubscribe: null,
  state () {
    return {
      // 配列
      data: [],
      alldata: []
      //   create_num: 0
    }
  },
  mutations: {
    // 受け取ったデータpayloadをステートに格納
    init (state, payload) {
      state.data = payload
      state.alldata = payload
    },
    // リンク追加時
    [ADD] (state, payload) {
      console.log('add')
      // DBから受け取ったデータをステートにセット
      state.data.push(payload)
    },
    alldata (state, payload) {
      console.log('alldataをステートに追加')
      // link_idを追加で更新する
      state.alldata.push(payload)
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
    },
    alldata (state) {
      return state.alldata
    }
  },
  actions: {
    clear ({ commit }) {
      commit('init', [])
    },
    // リスナーの起動
    startListener ({ commit }, userinfo) {
      if (this.unsubscribe || this.userinfo) {
        console.warn('listener is already running. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
      console.log(userinfo)
      console.log(userinfo.screenName)
      if (!userinfo.screenName || !userinfo) {
        console.warn('user does not exist')
        console.log(userinfo)
        return
      }
      // firestoreからデータを検索する
      this.unsubscribe = LinkRef.where('screenName', '==', userinfo.screenName).onSnapshot(querySnapshot => {
        // データが更新されるたびに呼び出される
        console.log(querySnapshot)
        querySnapshot.docChanges().forEach(change => {
          // querySnapshot.forEach(change => {
          console.log('links.js')
          console.log(change.doc.data())
          // 時刻がnullのものは表示しない
          if (!change.doc.data().createAt) {
            console.log(change.doc.data())
            return
          }
          // ミューテーションを通してステートを更新する
          if (change.type === 'added') {
            console.log('change.type add', change.type)
            // commit(ADD, payload)
            commit(ADD, change.doc.data())
          } else if (change.type === 'modified') {} else if (change.type === 'removed') {
            commit('REMOVE', change.doc.data())
          }
        })
      },
      (error) => {
        console.error(error.name)
      })
    },
    startListenerAll ({ commit }) {
      if (this.unsubscribe) {
        console.warn('listener is already running. ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
      // firestoreからデータを検索する
      this.unsubscribe = LinkRef.onSnapshot(querySnapshot => {
        // データが更新されるたびに呼び出される
        console.log(querySnapshot.docChanges())
        querySnapshot.docChanges().some(change => {
          // querySnapshot.forEach(change => {
          console.log('インデックスには15件取得する')
          console.log(change)
          console.log(change.doc.data())
          // 時刻がnullのものは表示しない
          if (!change.doc.data().createAt) {
            console.log(change.doc.data())
            return
          }
          if (change.newIndex === 15) {
            console.log('15件取得したので終わり')
            return true
          }
          // ミューテーションを通してステートを更新する
          if (change.type === 'added') {
            console.log('change.type add', change.type)
            // commit(ADD, payload)
            commit('alldata', change.doc.data())
          } else if (change.type === 'modified') {} else if (change.type === 'removed') {
            commit('REMOVE', change.doc.data())
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
      console.log('DBに登録するよ')
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
