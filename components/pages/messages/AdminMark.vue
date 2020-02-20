<template>
  <div class="admin-mark" v-if="typeof user.admin_role_id === 'number'">
    <VP :color="color">
      {{ user.admin_role_name }}
    </VP>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  },
  computed: {
    color() {
      const colors = {
        0: '#eff621',
        1: '#1eb96a',
        2: '#ff6b01'
      }
      return colors[this.user.admin_role_id] || 'var(--yellow-base)'
    }
  },
  created() {
    if (this.color) this.$emit('bgColor', this.color + '22')
  }
}
</script>

<style scoped>
.admin-mark {
  padding: var(--space-third) var(--space-half);
  width: 100%;
}
.admin-mark p {
  color: var(--grey-base);
}
</style>
