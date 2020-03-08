<template>
  <div>
    <VPageHeading level="3" button>
      {{ EXERCISE.title }}
    </VPageHeading>
    <div class="iframe" v-show="isIframe">
      <iframe
        @load="isIframe = true"
        id="ytplayer"
        type="text/html"
        allowfullscreen="allowfullscreen"
        width="100%"
        height="340"
        :src="
          'https://www.youtube.com/embed/' +
            EXERCISE.url +
            '?modestbranding=1&showinfo=0&rel=0&loop=1'
        "
        frameborder="0"
      ></iframe>
    </div>
    <div class="noIframe" v-show="!isIframe">
      <VH3 color="var(--white-base)">Видео загружается...</VH3>
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
  middleware: 'requireSub',
  components: { VTipSmall },
  data() {
    return {
      isIframe: false
    }
  },
  computed: {
    EXERCISE() {
      return this.$store.getters['workout/GET_EXERCISE_FROM_ALL'](
        this.$route.params.id
      )
    }
  },
  async fetch({ store, params }) {
    if (!store.getters['workout/GET_EXERCISE_FROM_ALL'](params.id))
      await store.dispatch('workout/FEED_ONE_EXERCISE', params.id)
  }
}
</script>

<style scoped>
.iframe {
  border-radius: var(--radius-half);
  overflow: hidden;
}

.noIframe {
  height: 340px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
