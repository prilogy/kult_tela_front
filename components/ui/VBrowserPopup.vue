<template>
  <VBigPopup class="browser-popup">
    <VH3>Здравия желаю!</VH3>
    <VP>
      Для оптимальной работы приложения рекомендуется использовать последние
      версии браузеров Google Chrome, Mozilla Firefox или Opera.
    </VP>
    <VP>
      Узнать, как не потерять приложение
    </VP>
    <nuxt-link to="/how-to-install">
      <VButton mb="var(--space-half)" w100>Как сохранить приложение</VButton>
    </nuxt-link>
    <VP>
      Посмотреть, как устроено приложение
    </VP>
    <nuxt-link to="/about">
      <VButton mb="var(--space-half)" w100>Инфо о приложении</VButton>
    </nuxt-link>
    <VButton w100 @click="$emit('close')">
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
