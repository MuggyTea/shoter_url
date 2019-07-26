/**
 * ログイン済みユーザーを管理するストア
 */
import firestore from '../../plugins/firebase'
import firebase from 'firebase'

// DBを呼び出す
const User = firestore.collection('Users')

const state = {
  user: null
}

const getters = {
  data () {
    return state.user
  }
}

const mutations = {
  setUser (state, user) {
    console.log('setUser')
    console.log(user)
    state.user = user
    console.log(state.user)
  }
}

const actions = {
  login (context) {
    console.log('user login now')
    // twitterログイン
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then((userCredential) => {
        // ユーザー情報を取り出す
        const userInfo = userCredential.additionalUserInfo.profile
        // ミューテーションを呼び出す
        context.commit('setUser', userInfo)
        // firestoreに送る
        User.where('id_str', '==', userInfo.id_str).get()
          .then(function (docs) {
            // 新規ユーザーだったらDBに登録
            if (!docs.empty) {
              console.log('user exist')
              console.log(userInfo)
              console.log(User.where('id_str', '==', userInfo.id_str))
            } else {
              console.log('regist user')
              User.add(userInfo)
                .then(doc => {
                  // ミューテーションの外でステート管理しない
                })
            }
          })
      })
      .catch((error) => {
        console.log(error)
      })
  },
  logout (context) {
    firebase.auth().signOut()
    context.commit('setUser', null)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
