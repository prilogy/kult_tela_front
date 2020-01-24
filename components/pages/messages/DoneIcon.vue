<template>
  <div>
    <div v-if="!double">
      <svg
        viewBox="0 0 18 14"
        :width="18 * sizeModificator"
        :height="14 * sizeModificator"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 2L6 14 .5 8.5l1.41-1.41L6 11.17 16.59.59 18 2z"
          :fill="fill"
        />
      </svg>
    </div>
    <div v-else>
      <svg
        :width="24 * sizeModificator"
        :height="14 * sizeModificator"
        viewBox="0 0 24 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M.41 8.41L6 14l1.41-1.42L1.83 7 .41 8.41zM22.24.58L11.66 11.17 7.5 7 6.07 8.41 11.66 14l12-12L22.24.58zM18 2L16.59.58l-6.35 6.35 1.42 1.41L18 2z"
          :fill="fill"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fill: {
      type: String,
      default: 'var(--yellow-base)'
    },
    sizeModificator: {
      type: Number,
      default: 1
    },
    double: {
      type: Boolean,
      default: false
    }
  }
}
</script>
