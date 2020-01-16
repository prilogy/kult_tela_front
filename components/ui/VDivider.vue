<template>
  <hr class="divider" :style="{ 'border-color': color }" />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'var(--grey-light1)'
    }
  }
}
</script>

<style scoped>
.divider {
  margin: 0;
  border: 1px solid;
  border-color: var(--grey-light2);
  border-radius: 2px;
}
</style>
