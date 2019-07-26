<template>
  <v-card>
    <v-container fill-height fluid pa-2>
      <v-layout align-center fill-height>
        <v-flex align-end xs12 flexbox>
          <v-img :src="link.src" max-height="100px"></v-img>
          <v-card-title primary-title>
            <div>
              <router-link
                v-bind:to="{name: 'LinkPage',
            params: {link_id: link.link_id, id: link.id} }"
              >
                <div color class="headline">{{ formatedTitle }}</div>
              </router-link>
              <span class="grey--text">{{ formatedDescription }}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat>
              <small class="text-muted">create at</small>
              <span>{{ releasedAtFromNow }}</span>
            </v-btn>
            <v-btn icon>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
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
