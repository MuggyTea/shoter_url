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
    state.user = user
  }
}

const actions = {
  login (context, data) {
    console.log('user login now')
    // twitterログイン
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then((userCredential) => {
        const userInfo = userCredential.additionalUserInfo.profile
        context.commit('setUser', userInfo)
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
