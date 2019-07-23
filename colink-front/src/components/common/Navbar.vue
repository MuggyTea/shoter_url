<template>
  <v-toolbar dark color="teal lighten-3">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <router-link to="/">
      <v-toolbar-title class="white--text">Co-Links</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <!-- <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>refresh</v-icon>
    </v-btn>-->
    <v-toolbar-items>
      <v-flex md4 text-md-center align-self-center>
        <div>
          <v-btn color="teal darken-4">
            <router-link class="white--text" to="/page">Create Links page</router-link>
          </v-btn>
        </div>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>
