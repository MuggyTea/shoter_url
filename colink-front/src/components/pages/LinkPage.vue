<template>
  <div class="details container-fluent text-center">
    <div class="col">
      <div class="card" v-if="link.id">
        <h5 class="card-title">
          {{ link.link_title }}
        </h5>
        <!-- <h6 class="card-subtitle text-muted">
          Platform:
          <a href="#" class="badge" style="margin-left:4px;"
          v-for="(platformm, index) in platforms"
          v-bind:key="index"
          v-bind:class="getTargetPlatformClass(platform)"
          v-on:click.prevent="updatePlatform(platform)"
          >
          {{ platform }}
          </a>
        </h6> -->
      </div>
      <div class="card-body text-left">
        <p class="card-text"
        v-html="formatedDescription" />
        <hr class="mb-3">
        <small>
          Release Date. {{ formatedReleasedAt }}
          </small>
      </div>
      <div class="card-footer text-right">
        <!-- <button class="btn"
        v-bind:class="{'btn-primary': link.million, 'btn-success': !link.million}"
        v-on:click="updateMillion(link.million)"
        >
        {{ millionButtonLabel }}
        </button> -->
        <button class="btn btn-primary"
        v-on:click="historyBack">
        back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANS from '../constants/'
export default {
  name: 'LinkDetailPage',
  data: function () {
    return {
      // 監視対象のidをdataプロパティにtargetIdとして定義
      // targetIdはpropsのidで更新する
      targetId: this.id
    }
  },
  // routeの動的セグメント
  props: [
    'link_id',
    'id'
  ],
  // pathの:idを直接書き換えた時の対応
  beforeRouteUpdate (to, from, next) {
    // 動的セグメントが変わった場合は、コールバック関数でtargetIdを更新する
    this.targetId = to.params.id
    next()
  },
  mounted () {
    console.log('mounted')
    this.init()
    this.start()
  },
  destroyed () {
    this.stop()
  },
  methods: {
    init () {
      this.$store.dispatch('link/clear')
    },
    start () {
      this.$store.dispatch('link/startListener', {id: this.targetId})
    },
    stop () {
      this.$store.dispatch('link/stopListener')
    },
    historyBack () {
      this.$router.back()
    }
  },
  computed: {
    link () {
      if (!this.targetId) {
        console.error('invalid id')
        console.error(this.targetId)
        return CONSTANS.ERROR_MEMO
      }
      console.log('link() sotore getter ')
      console.log(this.$store.getters['link/data'])
      return this.$store.getters['link/data']
    },
    platforms () {
      return CONSTANS.PLATFORMS
    },
    formatedDescription () {
      if (!this.link.description) {
        return ''
      }
      return this.link.description
        .replace('『', '<span class="badge-lg badge-pill badge-success p-1">')
        .replace('』', '</span>')
    },
    formatedReleasedAt () {
      if (!this.link.createAt) {
        console.log('releaseAt is none')
        console.log(this.link.createAt)
        return ''
      }
      return this.$moment(this.link.createAt).format('YYYY/MM/DD')
    }
  },
  watch: {
    'link' (n, o) {
      if (!n) {
        this.$router.push('/link-list')
      }
    }
  }
}
</script>
