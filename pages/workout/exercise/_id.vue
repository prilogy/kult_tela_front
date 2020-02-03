<template>
  <div>
    <VPageHeading level="3" button>
      {{ EXERCISE.title }}
    </VPageHeading>
    <div class="iframe">
      <iframe
        id="ytplayer"
        type="text/html"
        allowfullscreen="allowfullscreen"
        width="100%"
        height="340"
        :src="'http://www.youtube.com/embed/' + EXERCISE.url + '?autoplay=0'"
        frameborder="0"
      ></iframe>
    </div>
    <VTipSmall mt="var(--space-half)">
      <VP color="var(--grey-light3)">
        Не забывайте о своём здоровье, рассчитывайте нагрузку правильно!
      </VP>
    </VTipSmall>
  </div>
</template>

<script>
import { VTipSmall } from '../../../components/'
export default {
  components: { VTipSmall },
  computed: {
    EXERCISE() {
      return this.$store.getters['workout/GET_EXERCISE_FROM_ALL'](
        this.$route.params.id
      )
    }
  },
  async fetch({ store, params }) {
    if (!store.getters['workout/GET_EXERCISE_FROM_ALL'](params.id))
      await store.dispatch('workout/FEED_ALL_EXERCISES')
  }
}
</script>

<style scoped>
.iframe {
  border-radius: var(--radius-half);
  overflow: hidden;
}
</style>
