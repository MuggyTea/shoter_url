<template>
  <v-card flat tile>
    <v-toolbar color="primary">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title>Co-Links</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <!-- <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>refresh</v-icon>
      </v-btn>-->
      <v-toolbar-items>
        <v-btn outline to="/page">Create your page</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>
