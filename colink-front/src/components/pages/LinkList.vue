<template>
    <div class="photo-list">
        <h1>Link List</h1>
        <div class="grid">
            <LinkPhoto
                class="grid__item"
                v-for="photo in photos"
                :key="photo.id"
                :item="photo"
            />
            <OneLink></OneLink>
        </div>
    </div>
</template>

<script>
import LinkPhoto from './LinkPhoto'
import OneLink from './OneLink'
export default {
  components: {
    LinkPhoto,
    OneLink
  },
  data () {
    return {
      photos: []
    }
  }
}
</script>
