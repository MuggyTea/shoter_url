<template>
    <div class="photo-list">
        <h1>Index</h1>
        <div class="grid">
            <LinkPhoto
                class="grid__item"
                v-for="link_list in link_lists"
                :key="link_list.user_id"
                :item="link_list"
            />
            <OneLink></OneLink>
        </div>
    </div>
</template>

<script>
import LinkPhoto from './LinkPhoto'
import OneLink from './OneLink'
// export default {
//   components: {
//     LinkPhoto,
//     OneLink
//   },
//   data () {
//     return {
//       photos: []
//     }
//   }
// }
import { db } from './../../plugins/firebase'

export default {
  name: 'LinkList',
  components: {
    LinkPhoto,
    OneLink
  },
  props: {
    link_lists: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    link_lists: []
  }),
  firestore () {
    return {
      link_lists: db.collection('LinkList')
    }
  }
}
</script>
