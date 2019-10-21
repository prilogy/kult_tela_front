<template>
  <h3 class="h3" :style="style">
    <slot></slot>
  </h3>
</template>

<script>
import typography from '../../mixins/typography';

export default {
  mixins: [typography]
};
</script>

<style scoped>
.h3 {
  font-size: 24px;
  font-weight: 500;
  color: var(--yellow-base);
}
</style>
