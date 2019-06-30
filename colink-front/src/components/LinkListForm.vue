<template>
    <div class="card md-2 float-lg-left" style="width: 18rem;">
        <div class="card-header text-left">
            <input type="text" class="form-control" placeholder="link_title" v-model.trim="link.link_title">
        </div>
        <div class="card-body text-left">
            <textarea class="form-control" placeholder="descriptioin" v-model.trim="link.description"></textarea>
        </div>
        <div class="card-footer text-right">
            <button class="btn-sm btn-secondary" type="submit" v-on:click.prevent="addLink">add</button>
        </div>
    </div>
</template>
<script>
import CONSTANTS from './constants'
export default {
  name: 'LinkListForm',
  data () {
    return {
      link: this.emptyLink()
    }
  },
  methods: {
    addLink () {
      if (!this.link.link_title || !this.link.description) {
        return
      }
      this.link.platforms = []
      this.link.million = false
      this.link.createAt = new Date()
      this.$store.dispatch('addLink', this.link)
      this.link = this.emptyLink()
    },
    emptyLink () {
      console.log('empty link')
      return CONSTANTS.NEW_EMPTY_MEMO()
    }
  },
  watch: {
    'link' (n, o) {
      console.log('new: %s, old: %s', JSON.stringify(n), JSON.stringify(o))
    }
  }
}
</script>
