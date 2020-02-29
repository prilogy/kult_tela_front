<template>
  <div class="heading">
    <div
      :class="{
        heading__title: true,
        'heading__title--no-button': button === false,
        'heading__title--center': headerCenter
      }"
      :style="{
        marginBottom: titleOffset === 'var(--space-half)' ? null : titleOffset
      }"
    >
      <VButtonBack v-if="button"></VButtonBack>
      <div style="width: 100%;" v-if="divInside">
        <slot></slot>
      </div>
      <VH1 class="heading__title__h" v-else-if="level === '1'">
        <slot></slot>
      </VH1>
      <VH2 class="heading__title__h" v-else-if="level === '2'">
        <slot></slot>
      </VH2>
      <VH3 class="heading__title__h" v-else-if="level === '3'">
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
    },
    divInside: {
      type: Boolean,
      default: false
    },
    headerCenter: {
      type: Boolean,
      default: false
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
  width: 100%;
}

.heading__info p {
  color: var(--white-trans1) !important;
  font-weight: 300;
  font-size: 19px;
}

.heading__title--center h1,
.heading__title--center h2,
.heading__title--center h3 {
  text-align: center;
  width: 100%;
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
