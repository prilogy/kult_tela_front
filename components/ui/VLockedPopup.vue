<template>
  <VBigPopup class="tutor">
    <VH3 mb="var(--space-half)">Функция недоступна</VH3>
    <VP>
      Доступно в пакетах Артиллерия, Супер-солдат, Супер-солдат с наставником.
      <br />
      Изменить пакет участия можно в любой момент.
    </VP>
    <VButton w100 mt="var(--space-half)" @click="goTo('/change-plan')">
      Сменить пакет
    </VButton>
    <VButton w100 mt="var(--space-half)" @click="goTo">
      Закрыть
    </VButton>
  </VBigPopup>
</template>

<script>
import VBigPopup from '../utils/VBigPopup'
export default {
  components: {
    VBigPopup
  },
  methods: {
    goTo(route = '') {
      if (route) this.$router.push(route)
      this.$store.dispatch('popup/SET_LOCKED', false)
    }
  }
}
</script>

<style scoped>
.tutor {
  text-align: center;
}
.tutor >>> p {
  text-align: center;
}
</style>
