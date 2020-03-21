<template>
  <VBigPopup class="browser-popup">
    <VH3 mb="var(--space-half)">Здравия желаю!</VH3>
    <VP>
      Для оптимальной работы приложения рекомендуется использовать последние
      версии браузеров Google Chrome, Mozilla Firefox или Opera.
    </VP>
    <VButton w100 mt="var(--space-half)" @click="$emit('close')">
      Понятно
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
.browser-popup {
  text-align: center;
}
.browser-popup >>> .notification {
  z-index: 103;
}

.browser-popup >>> p {
  text-align: center;
}
</style>
