<template>
    <div class="card p-2 md-2 float-lg-left" style="width: 18rem;" v-bind:class="{ 'border-primary': !link.million, 'border-success': link.million}">
    <div class="card-header text-left">
        <router-link
            v-bind:to="{name: 'LinkPage',
            params: {link_id: link.link_id, id: link.id} }">
            {{ formatedTitle }}
        </router-link>
    </div>
    <div class="card-body text-left" v-bind:class="{'text-primary': !link.million, 'text-success': link.million}">
        <span
        class="badge badge-info"
        style="margin-left: 2px;"
        v-for="(platform, index) in link.platforms"
        v-bind:key="index">
        </span>
        <span class="card-text">
            {{ formatedDescription }}
        </span>
    </div>
    <div class="card-footer text-right">
        <small class="text-muted">create at</small>
        <span>{{ releasedAtFromNow }}</span>
        <span
        class="badge badge-success"
        v-show="link.million"
        >million
        </span>
    </div>
</div>
</template>

<script>
export default {
  name: 'LinkListCard',
  data () {
    return {releasedAtFromNow: this.getReleasedAtFromNow()
    }
  },
  moutend () {
    // releasedAtFromNowを1分ごとに更新する
    window.setInerval(() => {
      this.releasedAtFromNow = this.getReleasedAtFromNow()
    }, 1000 * 60)
  },
  props: {
    'link': {
      type: Object,
      required: true
    }
  },
  methods: {
    getReleasedAtFromNow () {
      if (!this.link || !this.link.createAt) {
        return ''
      }
      return this.$moment(this.link.createAt).fromNow()
    },
    getOmissionAndPlusMidpoint (str, limit) {
      if (str.length < limit) {
        return str
      }
      return str.substr(0, limit) + '...'
    }
  },
  computed: {
    formatedTitle () {
      if (!this.link || !this.link.link_title) {
        return ''
      }
      return this.getOmissionAndPlusMidpoint(this.link.link_title, 16)
    },
    formatedDescription () {
      if (!this.link || !this.link.description) {
        return ''
      }
      return this.getOmissionAndPlusMidpoint(this.link.description, 60)
    }
  },
  watch: {
    'link' (n, o) {
      console.log('watch link')
    }
  }
}

</script>
