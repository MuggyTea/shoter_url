<template>
    <div class="photo">
        <figure class="photo__wrapper">
            <img
                class="photo__image photo__image--portrait"
                :src="item.url"
                :alt="'Photo by ${item.owner.name}'"
            >
        </figure>
        <router-link
        class="photo_overlay"
        :to="'/photos/${item.id}'"
        :title="'View the photo by ${item.owner.name}'"
        >
        <div class="photo__controls">
            <button
                class="photo__action photo__action--like"
                title="Like photo"
            >
                <i class="icon ion-md-heart"></i>12
            </button>
        </div>
        </router-link >
    </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
