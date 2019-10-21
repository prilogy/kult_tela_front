<template>
  <p class="p" :style="typography">
    <slot></slot>
  </p>
</template>

<script>
import typography from '../../mixins/typography';

export default {
  mixins: [typography]
};
</script>

<style scoped>
.p {
  font-size: var(--p-fs);
  font-weight: 400;
  color: var(--white-base);
}
</style>
