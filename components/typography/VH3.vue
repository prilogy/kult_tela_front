<template>
  <h3 class="h3" :style="{ ...typography, ...indents }">
    <slot></slot>
  </h3>
</template>

<script>
import typography from '../../mixins/typography'
import indents from '../../mixins/indents'

export default {
  mixins: [typography, indents]
}
</script>

<style scoped>
.h3 {
  font-size: var(--h3-fs);
  font-weight: 400;
  color: var(--yellow-base);
  line-height: 1.2;
}
</style>
