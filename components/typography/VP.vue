<template>
  <p class="p" :style="style">
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
  font-size: 16px;
  font-weight: 400;
  color: var(--white-base);
}
</style>
