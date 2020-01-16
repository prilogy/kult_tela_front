<template>
  <div class="tip" :style="{ ...indents }">
    <slot></slot>
  </div>
</template>

<script>
import indents from '../../mixins/indents'

export default {
  mixins: [indents]
}
</script>

<style scoped>
.tip {
  background: var(--grey-light1);
  padding: var(--space-half);
  border-left: solid 3px var(--yellow-base);
  border-radius: 0 var(--radius) var(--radius) 0;
}
</style>
