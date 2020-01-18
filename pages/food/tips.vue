<template>
  <div class="tips">
    <div class="tips__top">
      <VButtonBack></VButtonBack>
      <VH2>Советы по питанию</VH2>
    </div>
  </div>
</template>

<script>
import { VButtonBack } from '../../components/'
export default {
  components: {
    VButtonBack
  }
}
</script>

<style scoped>
.tips__top {
  display: flex;
  align-items: center;
}
.tips__top h2 {
  margin-left: var(--space);
}
</style>
