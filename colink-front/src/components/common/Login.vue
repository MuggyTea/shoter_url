<template>
  <div class="login__auth">
    <template v-if="isAuth && userName && userPic">
      <div class="header__user-image">
        <img :src="userPic" />
      </div>
      <p class="header__user-name">
        {{ userName }}
        {{ user }}
      </p>
    </template>
    <div class="isAuthButtonText">
      <button v-if="isAuth" class="header__auth-button" @click="signOut">Sign-Out</button>
      <button v-else class="header__auth-button" @click="signIn">Sign-in with Twitter</button>
    </div>
  </div>
  <!-- <router-view :isAuth="isAuth" :userName="userName" :userPic="userPic"></router-view> -->
</template>

<script>
// firebase構成をインポートする
import firebase from 'firebase'
import firestore from '../../plugins/firebase'

export default {
  name: 'Login',
  data: function () {
    return {
      user: firebase.auth().currentUser,
      userName: null,
      userPic: null,
      userEmail: null,
      userEmailVerified: null,
      userUid: null,
      isSignedIn: null,
      // ログイン/ ログアウト確認
      isAuth: true,
      userInfo: null
    }
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged(
      user => {
        this.user = user || {}
        this.isAuth = !!user
        this.userName = user
          ? this.user.displayName : null
        this.userPic = user
          ? this.user.photoURL : null
        this.userEmail = user
          ? this.user.email : null
        this.userEmailVerified = user
          ? this.user.emailVerified : null
        this.userUid = user
          ? this.user.uid : null
      })
  },
  methods: {
    signIn: function () {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((userCredential) => {
          console.log(userCredential.additionalUserInfo)
          console.log(userCredential.additionalUserInfo.username)
          this.userInfo = userCredential.additionalUserInfo.profile
          this.RegistToDB(this.userInfo)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      })
    },
    RegistToDB: function (userInfo) {
      console.log('regist firestore')
      console.log(this.userUid)
      console.log(this.user.uid)
      this.user = firebase.auth().currentUser
      console.log(userInfo)
      // ステータスがチェンジされたら、ユーザー情報をfirestoreに登録
      // ユーザーが重複しないようにする
      firestore.collection('Users').doc(this.user.uid).set({
        userName: this.user.displayName,
        userPic: this.user.photoURL,
        userEmail: this.user.email,
        userUid: this.user.uid,
        userId: userInfo.screen_name,
        userDescription: userInfo.description
      })
        .then(function (userUid) {
          console.log('Document written with ID: ', this.userUid)
        })
        .catch(function (error) {
          console.log('Error adding document: ', error)
        })
    },
    firestore () {
      return {
        userInfo: firestore.collection('Users').doc(this.user.uid)
      }
    }
  }
}
</script>
