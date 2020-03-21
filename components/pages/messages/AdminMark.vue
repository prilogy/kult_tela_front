<template>
  <div
    class="admin-mark"
    v-if="user && typeof user.admin_role_id === 'number' && color"
  >
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
        '-1': '#eff621',
        0: '#eff621',
        1: '#1eb96a',
        2: '#ff6b01'
      }

      if (this.user && typeof this.user.admin_role_id === 'number') {
        if (
          this.user.admin_role_id === 2 &&
          this.$store.getters['user/GET_USER'].tutor_id === this.user.id
        )
          return colors[2]
        else if (
          this.user.admin_role_id === 2 &&
          this.$store.getters['user/GET_USER'].tutor_id !== this.user.id
        )
          return null

        return colors[this.user.admin_role_id] || 'var(--yellow-base)'
      } else return ''
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
