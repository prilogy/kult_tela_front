<template>
  <VBigPopup class="tutor">
    <VH3 mb="var(--space-half)">Здравия желаю!</VH3>
    <VP>
      Вы - супер-солдат, а весь путь пройдете вместе с супер-наставником, но для
      начала, вам нужно его выбрать!
    </VP>
    <VButton mt="var(--space)" @click="goTo">
      Выбрать наставника
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
    goTo() {
      this.$emit('clicked')
      this.$router.push('/choose-tutor')
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
