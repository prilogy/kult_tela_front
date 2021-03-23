<template>
  <VBigPopup class="tutor">
    <VH3 mb="var(--space-half)">Здравия желаю!</VH3>
    <VP>
      Теперь можно общаться в чате похудения и взаимопомощи!
    </VP>
    <VButton mt="var(--space)" @click="goTo">
      Перейти в чат
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
      this.$router.push('/messages/c1')
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
