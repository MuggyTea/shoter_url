<template>
  <v-card flat tile>
    <v-toolbar color="primary">
      <router-link to="/">
        <v-toolbar-title>Co-Links</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
      <v-icon>search</v-icon>
      </v-btn>-->
      <v-toolbar-items>
        <!-- <Login /> -->
        <!-- <v-btn outline to="/page">Create page</v-btn> -->
        <v-btn outline v-if="isLogin" to="/page">Create page</v-btn>
        <v-btn dark color="#2196F3" v-else @click="signIn">Twitter Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>
<script>
import Login from './Login'

export default {
  name: 'Navbar',
  components: {
    Login
  },
  data () {
    return {
      // 表示してるユーザーページ
      screenName: this.$route.params.screenName
    }
  },
  // pathの:idを直接書き換えた時の対応
  beforeRouteUpdate (to, from, next) {
    // 動的セグメントが変わった場合は、コールバック関数でtargetIdを更新する
    console.log('URL書き換え')
    this.screenName = to.params.id
    next()
  },
  methods: {
    signIn: function () {
      this.$store.dispatch('auth/login')
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters['auth/check']
    },
    userinfo () {
      return this.$store.getters['auth/user']
    }
  }
}
</script>
