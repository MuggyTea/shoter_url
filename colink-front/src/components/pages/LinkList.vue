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
        </div>
    </div>
</template>

<script>
import LinkPhoto from './LinkPhoto'
export default {
  components: {
    LinkPhoto
  },
  data () {
    return {
      photos: []
    }
  }
}
</script>
