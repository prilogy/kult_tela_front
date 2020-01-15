<template>
  <div class="tips">
    <div class="tips__top">
      <VButtonBack></VButtonBack>
      <VH2>Советы по питанию</VH2>
    </div>
  </div>
</template>

<script>
import { VH2, VButtonBack } from '../../components/'
import VButton from '../../components/ui/VButton'
export default {
  components: {
    VButtonBack,
    VButton,
    VH2
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
