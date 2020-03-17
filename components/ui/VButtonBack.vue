<template>
  <span class="wrapper" @click="back">
    <svg width="28" height="27" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.5 11.833H7.483l6.175-6.175-1.65-1.65L3.018 13l8.992 8.991 1.65-1.65-6.176-6.174H24.5v-2.334z"
        :fill="color"
      />
    </svg>
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'var(--yellow-base)'
    },
    to: {
      type: String,
      default: null
    }
  },
  methods: {
    back() {
      if (this.to) this.$router.push(this.to)
      else this.$router.back()
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  border-radius: 100px;
  padding: 4px;
  cursor: pointer;
}
.wrapper:focus,
.wrapper:active,
.wrapper:hover {
  background: var(--white-trans3);
}
</style>
