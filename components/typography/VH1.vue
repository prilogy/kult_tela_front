<template>
  <h1 class="h1" :style="{ ...typography, ...indents }">
    <slot></slot>
  </h1>
</template>

<script>
import typography from '../../mixins/typography'
import indents from '../../mixins/indents'

export default {
  mixins: [typography, indents]
}
</script>

<style scoped>
.h1 {
  font-size: var(--h1-fs);
  font-weight: 600;
  line-height: 1.4;
  color: var(--yellow-base);
}
</style>
