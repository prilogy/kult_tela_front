<template>
  <h1 class="h1" :style="style">
    <slot></slot>
  </h1>
</template>

<script>
const WEIGHTS = {
  bold: 600,
  medium: 500,
  regular: 400,
  light: 300
};

export default {
  props: {
    weight: String,
    color: String
  },
  data() {
    return {
      style: {
        color: this.color || "",
        fontWeight: WEIGHTS[this.weight] || ""
      }
    };
  }
};
</script>

<style scoped>
.h1 {
  font-size: 40px;
}
</style>