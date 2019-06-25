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

        <router-view
            :isAuth="isAuth"
            :userName="userName"
            :userPic="userPic"
        ></router-view>
    </div>
</template>

<script>
// firebase構成をインポートする
import firebase from 'firebase'
import { db } from '../../plugins/firebase'

export default {
  name: 'Login',
  data () {
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
      userinfo: []
    }
  },
  created: function () {
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

        console.log(this.userUid)

        console.log('regist firestore')
        // ユーザー情報をfirestoreに登録
        db.collection('Users').doc(this.userUid).set({
          userName: this.user.displayName,
          userPic: this.user.photoURL,
          userEmail: this.user.email,
          userUid: this.user.uid
        })
          .then(function (docRef) {
            console.log('Document written with ID: ', this.userUid)
          })
          .catch(function (error) {
            console.log('Error adding document: ', error)
          })
      })
  },
  methods: {
    signInandRegistar: function () {
      this.signIn()
      this.LoginToDB()
    },
    signIn: function () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      })
    },
    firestore () {
      return {
        userinfo: db.collection('Users').doc(this.user.uid)
      }
    }
  }
}
</script>

// export default {
//   name: 'Login',
//   data () {
//     return {
//       userName: null,
//       userPic: null,
//       isSignedIn: null,
//       authButtonText: null,
//       authFunction: function () {}
//     }
//   },
//   created () {
//     this.onAuthStateChanged()
//   },
//   methods: {
//     onAuthStateChanged: function () {
//       firebase.auth().onAuthStateChanged(user => {
//         this.userName = user
//           ? this.getUserName() : null
//         this.userPic = user
//           ? this.getProfilePicUrl() : null
//         this.authButtonText = user
//           ? 'Sign-out' : 'Sign-in with Google'
//         this.authFunction = user
//           ? this.signOut : this.signIn
//         this.isSignedIn = !!user
//       })
//     },
//     signIn: function () {
//       const provider = new firebase.auth.GoogleAuthProvider()
//       firebase.auth().signInWithPopup(provider)
//     },
//     signOut: function () {
//       firebase.auth().signOut()
//     },
//     isUserSignedIn: function () {
//       return !!firebase.auth().currentUser || false
//     },
//     getProfilePicUrl: function () {
//       return firebase.auth().currentUser.displayName
//     }
//   }
// }
// </script>

// <style lang="scss">
// //   body {
// //     background-color: #ECEFF1;
// //   }
//   .header {
//     background-color: #009CE5;
//     &__inner {
//       width: 90%;
//       height: 70px;
//       margin: 0 auto;
//       display: flex;
//       align-items: center;
//     }
//     &__user-image {
//       position: relative;
//       width: 50px;
//       height: 50px;
//       overflow: hidden;
//       border-radius: 50%;
//       img {
//         width: 100%;
//         height: auto;
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         transform: translateX(-50%) translateY(-50%);
//       }
//     }
//     &__user-name {
//       margin: 0 15px;
//       color: #FFF;
//     }
//     &__auth-button {
//       background: #FFF;
//       border: none;
//       border-radius: 50px;
//       padding: 5px 10px;
//       color: #009CE5;
//     }
//   }
// </style>
