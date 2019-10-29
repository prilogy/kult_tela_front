<template>
  <p class="p" :style="{ ...typography, ...indents }">
    <slot></slot>
  </p>
</template>

<script>
import typography from '../../mixins/typography'
import indents from '../../mixins/indents'

export default {
  mixins: [typography, indents]
}
</script>

<style scoped>
.p {
  font-size: var(--p-fs);
  font-weight: 400;
  color: var(--white-base);
}
</style>
