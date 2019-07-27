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
  methods: {
    signIn: async function () {
      await this.$store.dispatch('auth/login')
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
