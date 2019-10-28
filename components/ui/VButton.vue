<template>
  <button
    @click="$emit('click')"
    :style="indents"
    :disabled="disabled"
    :class="{
      button: true,
      'button--w100': w100,
      'button--disabled': disabled
    }"
  >
    <VH3 :weight="weight">
      <slot></slot>
    </VH3>
  </button>
</template>

<script>
import VH3 from '../typography/VH3'
import indents from '../../mixins/indents'

export default {
  props: {
    w100: Boolean,
    weight: String,
    disabled: Boolean
  },
  components: { VH3 },
  mixins: [indents]
}
</script>

<style scoped>
.button {
  background: var(--yellow-base);
  padding: var(--space-half) var(--space);
}

.button--w100 {
  width: 100%;
}

.button:active,
.button:hover,
.button:focus {
  box-shadow: 0 3px 0 var(--yellow-trans1);
  transform: translateY(-3px);
}

.button--disabled {
  background: var(--grey-light3);
  color: var(--grey-light2);
}
.button--disabled:active,
.button--disabled:hover,
.button--disabled:focus {
  box-shadow: none;
  transform: none;
}

.button h3 {
  color: var(--grey-base);
  text-align: center;
}
</style>
