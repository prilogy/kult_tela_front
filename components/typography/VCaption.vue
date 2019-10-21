<template>
  <p class="caption" :style="style">
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
  font-size: 14px;
  font-weight: 300;
  color: var(--white-base);
}
</style>
