<template>
<h1>
    LinkPage
</h1>
</template>

<script>
export default {
  name: 'LinkDetailPage',
  props: ['id'], // routeの動的セグメント
  // pathの:idを直接書き換えた時の対応
  beforeRouteUpdate (to, from, next) {
    // 動的セグメントが変わった場合は、コールバック関数でtargetIdを更新する
    this.targetId = to.params.id
    next()
  },
  link_lists: {
    type: Object,
    required: true
  },
  data: function () {
    return {
      // 監視対象のidをdataプロパティにtargetIdとして定義
      // targetIdはpropsのidで更新する
      targetId: this.id
    }
  },
  computed: {
    link () {
      if (!this.targetId) {
        console.error('invalid id')
        console.error(this.targetId)
      }
      return this.$store.getters.linkById(parseInt(this.targetId, 10))
    }
  }
}
</script>
