<template>
  <h1 class="h1" :style="style">
    <slot></slot>
  </h1>
</template>

<script>
import typography from '../../mixins/typography';

export default {
  mixins: [typography],
  data() {
    return {
        defaultWidth: 600
    };
  }
};
</script>

<style scoped>
.h1 {
  font-size: 40px;
}
</style>
