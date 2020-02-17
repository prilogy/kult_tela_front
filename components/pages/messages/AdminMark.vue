<template>
  <div
    :style="{ background: color }"
    class="admin-mark"
    v-if="typeof user.admin_role_id === 'number'"
  >
    <VP :color="coloredText && color">
      {{ user.admin_role_name }}
    </VP>
  </div>
</template>

<script>
export default {
  props: {
    coloredText: {
      type: Boolean,
      default: false
    },
    user: Object
  },
  computed: {
    color() {
      const colors = {
        0: 'var(--yellow-base)',
        1: 'var(--green-base)',
        2: 'var(--red-base)'
      }
      return colors[this.user.admin_role_id] || 'var(--yellow-base)'
    }
  }
}
</script>

<style scoped>
.admin-mark {
  padding: var(--space-third) var(--space-half);

  background: var(--yellow-base);

  width: fit-content;
}
.admin-mark p {
  color: var(--grey-base);
}
</style>
