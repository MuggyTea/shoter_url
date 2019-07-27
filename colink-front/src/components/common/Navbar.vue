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
        <div v-if="isLogin" class="navbar__item"></div>
        <span v-if="isLogin" class="navbar__item"></span>
        <div v-else class="navbar__item">{{ isLogin }}</div>
        <Login />
        <v-btn outline to="/page">Create your page</v-btn>
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
