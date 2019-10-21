<template>
  <h1 class="h1" :style="typography">
    <slot></slot>
  </h1>
</template>

<script>
import typography from '../../mixins/typography';

export default {
  mixins: [typography]
};
</script>

<style scoped>
.h1 {
  font-size: var(--h1-fs);
  font-weight: 600;
  color: var(--yellow-base);
}
</style>
