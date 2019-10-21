<template>
  <p class="caption" :style="typography">
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
.caption {
  font-size: var(--caption-fs);
  font-weight: 300;
  color: var(--white-base);
}
</style>
