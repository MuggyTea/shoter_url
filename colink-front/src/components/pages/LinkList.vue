<template>
    <div class="photo-list container-fluent">
        <!-- <h1>Index</h1> -->
        <div class="row justify-content-start">
          <!-- {{ links }} -->
          <link-list-card
          v-for="(link, index) in links"
          v-bind:key="index"
          v-bind:link="link">
          </link-list-card>
          <link-list-form></link-list-form>
        </div>

        <div class="row">
          <button class="btn-sm btn-dark m-1"
          v-for="{link, index} in links"
          v-bind:key="index"
          v-bind:link="link"
          v-on:click="remove(link.id)">
          {{ index }}
          </button>
        </div>
        <!-- <div class="grid">
            <link-photo
                class="grid__item"
                v-for="link_list in link_lists"
                :key="link_list.user_id"
                :item="link_list"
            />
            <one-link></one-link>
        </div> -->
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
  props: {
    link_lists: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.init()
    this.start()
  },
  destroyed () {
    this.stop()
  },
  methods: {
    init () {
      console.log('メモを検索する')
      this.$store.dispatch('links/clear')
    },
    start () {
      this.$store.dispatch('links/startListener')
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
    links () {
      console.log('getter')
      // console.log(this.$store.getters['links/data'])
      return this.$store.getters['links/data']
    }
  }
}
</script>
