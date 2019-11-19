<template>
  <img @click="$emit('click')" class="icon" :src="src" :alt="icon" />
</template>

<script>
export default {
  props: {
    icon: String,
    format: String
  },
  computed: {
    src() {
      return '/icons/' + this.icon + (this.format ? this.format : '.svg')
    }
  }
}
</script>

<style scoped>
.icon {
  height: 100%;
}
</style>
