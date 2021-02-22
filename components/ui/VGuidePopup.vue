<template>
  <VBigPopup class="browser-popup">
    <div v-if="contentType === 0">
      <VH3>О проекте. Результаты</VH3>
      <iframe
        id="ytplayer"
        @load="isIframe = true"
        type="text/html"
        allowfullscreen="allowfullscreen"
        width="100%"
        height="340"
        :src="
        'https://www.youtube.com/embed/vGaSaZ1SwYc?modestbranding=1&showinfo=0&rel=0&loop=1'
      "
        frameborder="0"
      ></iframe>
      <VButton w100 mt="var(--space-half)" @click="contentType = 1">
        Экскурсия по приложению
      </VButton>
    </div>

    <div v-else-if="contentType === 1">
      <VH3>Экскурсия по приложению</VH3>
      <iframe
        id="ytplayer2"
        @load="isIframe = true"
        type="text/html"
        allowfullscreen="allowfullscreen"
        width="100%"
        height="340"
        :src="
        'https://www.youtube.com/embed/5G_cyOKUvTY?modestbranding=1&showinfo=0&rel=0&loop=1'
      "
        frameborder="0"
      ></iframe>
      <VButton w100 mt="var(--space-half)" @click="contentType = 0">
        О проекте. Результаты
      </VButton>
    </div>

    <VButton w100 mt="var(--space-half)" @click="$emit('close')">
      К регистрации
    </VButton>
  </VBigPopup>
</template>

<script>
import VBigPopup from '../utils/VBigPopup'

export default {
  components: {
    VBigPopup
  },
  data: () => ({
    contentType: 0
  })
}
</script>

<style scoped>
.browser-popup >>> .notification {
  display: block;
}

.browser-popup h3 {
  text-align: left;
  margin-bottom: var(--space-half);
}

.browser-popup >>> .notification {
  z-index: 103;
}

.browser-popup >>> p {
  text-align: left;
  margin-bottom: var(--space-third);
}
</style>
