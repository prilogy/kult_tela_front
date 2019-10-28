<template>
  <h2 class="h2" :style="{ ...typography, ...indents }">
    <slot></slot>
  </h2>
</template>

<script>
import typography from '../../mixins/typography'
import indents from '../../mixins/indents'

export default {
  mixins: [typography, indents]
}
</script>

<style scoped>
.h2 {
  font-size: var(--h2-fs);
  font-weight: 500;
  color: var(--yellow-base);
}
</style>
