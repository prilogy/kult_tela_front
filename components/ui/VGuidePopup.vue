<template>
  <VBigPopup class="browser-popup">
    <VH3>Экскурсия по онлайн-армии</VH3>
    <iframe
      id="ytplayer"
      @load="isIframe = true"
      type="text/html"
      allowfullscreen="allowfullscreen"
      width="100%"
      height="340"
      :src="
        'https://www.youtube.com/embed/mEo6Tb0893g?modestbranding=1&showinfo=0&rel=0&loop=1'
      "
      frameborder="0"
    ></iframe>
    <VButton w100 mt="var(--space-half)" @click="$emit('close')">
      Закрыть
    </VButton>
  </VBigPopup>
</template>

<script>
import VBigPopup from '../utils/VBigPopup'

export default {
  components: {
    VBigPopup
  }
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
