<template>
  <div>
    <VPageHeading level="3" button>
      {{ VIDEO.title }}
    </VPageHeading>
    <div class="iframe">
      <iframe
        id="ytplayer"
        type="text/html"
        allowfullscreen="allowfullscreen"
        width="100%"
        height="340"
        :src="'https://www.youtube.com/embed/' + VIDEO.url + '?autoplay=0'"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'requireSub',
  computed: {
    VIDEO() {
      return this.$store.getters['food/GET_TIP_FROM_ALL'](this.$route.params.id)
    }
  },
  async fetch({ store, params }) {
    if (!store.getters['food/GET_TIP_FROM_ALL'](params.id))
      await store.dispatch('food/FEED_TIPS_VIDEOS')
  }
}
</script>

<style scoped>
.iframe {
  border-radius: var(--radius-half);
  overflow: hidden;
}
</style>
