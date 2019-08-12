<template>
  <div class="link-list">
    <v-card>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <!-- <h1>Index</h1> -->
          <div class="row justify-content-center">
            <!-- {{ links }} -->
            <link-list-card v-for="(link, index) in links" v-bind:key="index" v-bind:link="link"></link-list-card>
            <link-list-form></link-list-form>
          </div>
        </v-layout>
      </v-container>
    </v-card>
    <div class="row__test__delete">
      <button
        class="btn-sm btn-dark m-1"
        v-for="(link, index) in links"
        v-bind:key="index"
        v-on:click="remove(link.id)"
      >{{ index }}</button>
    </div>
    <!-- <div class="grid">
            <link-photo
                class="grid__item"
                v-for="link_list in link_lists"
                :key="link_list.user_id"
                :item="link_list"
            />
            <one-link></one-link>
    </div>-->
  </div>
</template>

<script>
import LinkPhoto from '../LinkPhoto'
import OneLink from '../OneLink'
import LinkListCard from '../LinkListCard'
import LinkListForm from '../LinkListForm'

export default {
  name: 'LinkList',
  components: {
    'link-photo': LinkPhoto,
    'one-link': OneLink,
    'link-list-card': LinkListCard,
    'link-list-form': LinkListForm
  },
  data () {
    return {
    }
  },
  props: [
    'screen_name'
  ],
  // pathの:idを直接書き換えた時の対応
  beforeRouteUpdate (to, from, next) {
    // 動的セグメントが変わった場合は、コールバック関数でtargetIdを更新する
    console.log('URL書き換え')
    this.screen_name = to.params.screen_name
    this.init()
    this.start(this.screen_name)
    next()
  },
  mounted () {
    this.init()
    this.start(this.screen_name)
  },
  destroyed () {
    this.stop()
  },
  methods: {
    init () {
      console.log('メモを検索する')
      this.$store.dispatch('links/clear')
    },
    start (screenName) {
      console.log(screenName)
      // const User = this.userinfo
      // const screenName = userinfo.screenName
      this.$store.dispatch('links/startListener', {screenName})
    },
    stop () {
      this.$store.dispatch('links/stopListener')
    },
    remove (id) {
      console.log(this.$store.dispatch('links/deleteLink', {id}))
      this.$store.dispatch('links/deleteLink', {id})
    }
  },
  // computedには結果がキャッシュされる
  // getterには引数は渡せない
  // ゲッター
  computed: {
    userinfo () {
      console.log('userinfo取得')
      // console.log(this.$store.getters['auth/user'])
      // console.log($store.getters['auth/user'])
      return this.$store.getters['auth/user']
    },
    isLogin () {
      console.log('ログイン判定取得')
      return this.$store.getters['auth/check']
    },
    links () {
      console.log('getter')
      // console.log(this.$store.getters['links/data'])
      return this.$store.getters['links/data']
    }
  }
}
</script>
<style>
/* .link-list {
  margin: auto;
} */

.row__test__delete {
  margin: auto;
}
</style>
