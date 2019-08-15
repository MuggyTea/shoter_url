<template>
    <div v-if="isLogin" class="card md-2 float-lg-left" style="width: 18rem;">
        <div class="card-header text-left">
            <input type="text" class="form-control" placeholder="link_title" v-model.trim="link.link_title">
        </div>
        <div class="card-body text-left">
            <textarea class="form-control" placeholder="descriptioin" v-model.trim="link.description"></textarea>
        </div>
        <button class="button" @click="showForm = ! showForm">
          <i class="icon ion-md-add"></i>
          photo upload
        </button>
        <PhotoUpload v-model="showForm" />
        <div class="card-footer text-right">
            <button class="btn-sm btn-secondary" type="submit" v-on:click.prevent="addLink">add</button>
        </div>
    </div>
</template>
<script>
import CONSTANTS from './constants'
import PhotoUpload from './PhotoUpload'

export default {
  name: 'LinkListForm',
  components: {
    PhotoUpload
  },
  data () {
    return {
      link: this.emptyLink(),
      showForm: false
    }
  },
  methods: {
    addLink () {
      if (!this.link.link_title || !this.link.description) {
        return
      }
      console.log('add new Link')
      console.log(new Date())
      //   console.log(this.emptyLink())
      this.link.platforms = []
      this.link.million = false
      this.link.createAt = new Date()
      this.link.userinfo = this.userinfo
      this.link.screenName = this.userinfo.screenName
      this.link.uid = this.userinfo.uid
      this.link.id_str = this.userinfo.id_str
      console.log(this.link)
      // ステートを変更
      this.$store.dispatch('links/addLink', this.link)
      // 空に戻す
      this.link = this.emptyLink()
    },
    emptyLink () {
      console.log('empty link')
      return CONSTANTS.NEW_EMPTY_MEMO()
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters['auth/check']
    },
    userinfo () {
      return this.$store.getters['auth/user']
    }
  },
  watch: {
    'link' (n, o) {
      console.log('new: %s, old: %s', JSON.stringify(n), JSON.stringify(o))
    }
  }
}
</script>
