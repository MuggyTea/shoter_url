<template>
  <v-app>
    <!-- <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-toolbar>-->
    <Navbar />
    <v-content>
      <PageList />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import PageList from './components/pages/LinkList'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Navbar,
    Footer,
    PageList
  },
  data () {
    return {
      //
    }
  }
}
</script>
