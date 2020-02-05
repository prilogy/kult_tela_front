<template>
  <div class="heading">
    <div
      :class="{
        heading__title: true,
        'heading__title--no-button': button === false
      }"
      :style="{
        marginBottom: titleOffset === 'var(--space-half)' ? null : titleOffset
      }"
    >
      <VButtonBack v-if="button"></VButtonBack>
      <VH1 v-if="level === '1'">
        <slot></slot>
      </VH1>
      <VH2 v-else-if="level === '2'">
        <slot></slot>
      </VH2>
      <VH3 v-else-if="level === '3'">
        <slot></slot>
      </VH3>
    </div>
    <div class="heading__info">
      <VP>
        <slot name="info"></slot>
      </VP>
    </div>
  </div>
</template>

<script>
import VButtonBack from './VButtonBack'
export default {
  components: { VButtonBack },
  props: {
    button: {
      type: Boolean,
      default: false
    },
    level: {
      type: String,
      default: '2'
    },
    titleOffset: {
      type: String,
      default: 'var(--space-half)'
    }
  }
}
</script>

<style scoped>
.heading {
  margin-bottom: var(--space-half);
}
.heading__title {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-third);
}

.heading__info p {
  color: var(--white-trans1) !important;
  font-weight: 300;
  font-size: 19px;
}

h1,
h2,
h3 {
  margin-left: var(--space-half);
}

.heading__title--no-button h1,
.heading__title--no-button h2,
.heading__title--no-button h3 {
  margin-left: 0;
}
</style>
