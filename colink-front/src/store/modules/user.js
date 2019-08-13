/**
 * ログイン済みユーザーを管理するストア
 */
import firestore from '../../plugins/firebase'

// DBを呼び出す
const currentUserInfo = firestore.collection('currentUserInfo')

const state = {
  user: null
}

const getters = {
  // ログインユーザー
  userProfile: state => state.user ? state.user : null
}

const mutations = {
  setUser (state, user) {
    console.log('setUser')
    console.log(user)
    state.user = user
  }
}

const actions = {
  //   currentUser (context, user) {
  //     console.log('currentUser')
  //     console.log(user)
  //     // ログインしていたら、認証情報からDBを引く
  //     if (!user) {
  //       context.commit('setUser', null)
  //     } else {
  //       console.log(user.uid)
  //       const currentUser = currentUserInfo.doc(user.uid)
  //       console.log(currentUser)
  //       console.log(typeof currentUser)
  //       console.log(currentUser.get())
  //       currentUser.get().then(function (doc) {
  //         console.log(doc.data())
  //         // ステート更新
  //         context.commit('setUser', doc.data())
  //       })
  //     }
  //   },
  userData (context, screenName) {
    console.log(screenName)
    console.log(currentUserInfo.where('screenName', '==', screenName).get())
    currentUserInfo.where('screenName', '==', screenName.screen_name).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        console.log(doc.data())
        context.commit('setUser', doc.data())
      })
    })
    return this.doc.data()
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
