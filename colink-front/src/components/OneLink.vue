<template>
    <v-list three-line>
        <template v-for="(link_page, index) in link_pages">
            {{ index }}
            {{ link_page.link_url }}
            {{ link_page.link_name }}
        </template>
    </v-list>
</template>

<script>
import { db } from '../plugins/firebase'

export default {
  name: 'OneLink',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    link_pages: []
  }),
  firestore () {
    return {
      link_pages: db.collection('LinkPage')
    }
  }
}

</script>
