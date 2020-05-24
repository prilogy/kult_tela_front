<template>
  <div>
    <VPageHeading level="3" button>
      Установка приложения на Android
      <template v-slot:info>
        Для установки приложения на Android рекомендуется использовать браузер Google Chrome.
      </template>
    </VPageHeading>
    <div class="step" v-for="step in guide" :key="step.id">
      <div class="__num">
        <VH3>{{step.id + 1}}</VH3>
        <div class="__line"></div>
      </div>
      <div class="__info">
        <VP color="var(--yellow-base)">
          {{step.text}}
        </VP>
        <img :src="step.image" alt="1">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        guide: [
          {
            id: 0,
            text: 'Откройте меню браузера и нажмите на кнопку "Добавить на главный экран".',
            image: '/images/install/android1.jpg'
          },
          {
            id: 1,
            text: 'Нажмите на "Добавить" для подтверждения установки.',
            image: '/images/install/android2.jpg'
          },
          {
            id: 2,
            text: 'Готово! Теперь Культ Тела появится в вашем списке приложений!',
            image: '/images/install/android3.jpg'
          }
        ]
      }
    }
  }

</script>

<style scoped>

</style>
