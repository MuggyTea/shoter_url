import firestore from '../../plugins/firebase'
/**
 * リンクページ一覧のストアモジュール
 * リンク詳細ページで表示するリンクの配列を管理する
 */

// DBを呼び出す
const LinkRef = firestore.collection('LinkList')

export default {
  namespaced: true,
  unsubscribe: null,
  state () {
    return {
      // 配列
      data: []
    }
  },
  mutations: {
    // 受け取ったデータpayloadをステートに格納
    init (state, payload) {
      state.data = payload
    },
    // リンク追加時
    add (state, payload) {
      console.log('add')
      console.log(payload)
      state.data.push(payload)
    },
    // 呼び出すとき
    set (state, payload) {
      const index = state.data.findIndex(link => link.id === payload.id)
      if (index !== -1) {
        state.data[index] = payload
      }
    },
    // 削除時
    remove (state, payload) {
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
          console.log(change.doc)
          const payload = {
            id: change.doc.id,
            link_title: change.doc.data().link_title,
            description: change.doc.data().description,
            platforms: change.doc.data().platforms,
            million: change.doc.data().million,
            createAt: new Date(change.doc.data().createAt.seconds * 100),
            photo: change.doc.data().photo
          }
          // ミューテーションを通してステートを更新する
          if (change.type === 'added') {
            commit('add', payload)
          } else if (change.type === 'modified') {} else if (change.type === 'removed') {
            commit('remove', payload)
          }
        })
      },
      (error) => {
        console.error(error.name)
      })
    },
    // リスナーの停止
    stopListener () {
      if (this.clear.unsubscribe) {
        console.log('listener is stopping ', this.unsubscribe)
        this.unsubscribe()
        this.unsubscribe = null
      }
    },
    addLink ({ commit }, payload) {
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
