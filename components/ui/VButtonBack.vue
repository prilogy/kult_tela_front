<template>
  <VIcon @click="back" icon="back" />
</template>

<script>
import VIcon from '../utils/VIcon'
export default {
  components: { VIcon },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.icon {
  height: 100%;
}
</style>
