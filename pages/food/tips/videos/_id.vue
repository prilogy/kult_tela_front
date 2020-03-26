<template>
  <div>
    <VPageHeading level="3" button>
      {{ VIDEO.title }}
    </VPageHeading>
    <div class="iframe" v-show="isIframe">
      <iframe
        id="ytplayer"
        @load="isIframe = true"
        type="text/html"
        allowfullscreen="allowfullscreen"
        width="100%"
        height="340"
        :src="
          'https://www.youtube.com/embed/' +
            VIDEO.url +
            '?modestbranding=1&showinfo=0&rel=0&loop=1'
        "
        frameborder="0"
      ></iframe>
    </div>
    <div class="noIframe" v-show="!isIframe">
      <VH3 color="var(--white-base)">Видео загружается...</VH3>
    </div>
    <div v-if="VIDEO.id === 30">
      <VH3 mb="var(--space-third)" mt="var(--space-third)">Совершенно секретно</VH3>
      <VP color="var(--grey-light3)">
        Марина Богомолова - феномен похудения. Постройнела за 2 года с 209,6 кг до 108 кг без единой операции и "химии".
        Победитель "Культ тела 2". В 2018м году возглавила Армию безопасного похудения, получив звание Генерала Армии.
        Передает свой опыт новобранцам.
      </VP>
    </div>

  </div>
</template>

<script>
  export default {
    middleware: 'requireSub',
    data() {
      return {
        isIframe: false
      }
    },
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

  .noIframe {
    height: 340px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
