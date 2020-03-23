<template>
  <VBigPopup class="browser-popup">
    <VH3>Здравия желаю!</VH3>
    <VP>
      Для оптимальной работы приложения рекомендуется использовать последние
      версии браузеров Google Chrome, Mozilla Firefox или Opera.
    </VP>
    <VP>
      Посмотреть, как устроено приложение можно в разделе "О приложении".
    </VP>
    <nuxt-link to="/about">
      <VButton w100 @click="$emit('close')">О приложении</VButton>
    </nuxt-link>
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
