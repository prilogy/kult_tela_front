<template>
  <hr
    class="divider"
    :style="{ 'border-color': color, 'border-width': width + 'px' }"
  />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'var(--grey-light1)'
    },
    width: {
      type: Number,
      default: 1
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
