<!--
<template>
    <div class="container--small">
        <ul class="tab">
            <li
                class="tab__item"
                :class="{ 'tab__item--active': tab == 1 }"
                @click="tab = 1"
            >
            Login
            </li>
            <li
                class="tab__item"
                :class="{ 'tab__item--active': tab === 2 }"
                @click="tab = 2"
            >
            Register
            </li>
        </ul>
        <div class="panel" v-show="tab === 1">
            Login Form
        </div>
        <div class="panel" v-show="tab === 2">
            Register Form
        </div>
    </div>
</template>
-->
<template>
    <div class="login__auth">
        <template
            v-if="isAuth && userName && userPic"
        >
            <div class="header__user-image">
                <img :src="userPic">
            </div>
            <p class="header__user-name">
                {{ userinfo }}
                {{ userinfo.userName }}
            </p>
        </template>
        <div class='isAuthButtonText'>
        <button
            v-if="isAuth"
            class="header__auth-button"
            @click="signOut"
        >
        Sign-Out
        </button>
        <button
            v-else
            class="header__auth-button"
            @click="signInandRegistar"
        >
        Sign-in with Google
        </button>
        </div>
<!--
        <router-view
            :isAuth="isAuth"
            :userName="userName"
            :userPic="userPic"
        ></router-view> -->
    </div>
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
      isAuth: true
    }
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged(
      user => {
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
    signInandRegistar: function () {
      this.signIn()
      this.RegistToDB()
    },
    signIn: function () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
      // ログイン後にDBに登録する
      firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
          console.log('regist firestore')
          console.log(result)
          console.log(result.credential)
          console.log(result.user)
          // ステータスがチェンジされたら、ユーザー情報をfirestoreに登録
          // ユーザーが重複しないようにする
          firestore.collection('Users').doc(this.userUid).set({
            userName: this.user.displayName,
            userPic: this.user.photoURL,
            userEmail: this.user.email,
            userUid: this.user.uid
          })
            .then(function (userUid) {
              console.log('Document written with ID: ', userUid)
            })
            .catch(function (error) {
              console.log('Error adding document: ', error)
            })
        }
      }).catch(function (error) {
        console.log(error.code)
        console.log(error.message)
        console.log(error.email)
        console.log(error.credential)
      })
    },
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      })
    },
    RegistToDB: function () {
    //   console.log(this.userUid)

    //   console.log('regist firestore')
    //   // ステータスがチェンジされたら、ユーザー情報をfirestoreに登録
    //   // ユーザーが重複しないようにする
    //   db.collection('Users').doc(this.userUid).set({
    //     userName: this.user.displayName,
    //     userPic: this.user.photoURL,
    //     userEmail: this.user.email,
    //     userUid: this.user.uid
    //   })
    //     .then(function (userUid) {
    //       console.log('Document written with ID: ', userUid)
    //     })
    //     .catch(function (error) {
    //       console.log('Error adding document: ', error)
    //     })
    },
    firestore () {
      return {
        userinfo: firestore.collection('Users').doc(this.userUid)
      }
    }
  }
}
</script>
