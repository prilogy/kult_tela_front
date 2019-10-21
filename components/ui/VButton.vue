<template>
  <button :style="indents" :class="{ button: true, 'button--w100': w100 }">
    <VH3>
      <slot></slot>
    </VH3>
  </button>
</template>

<script>
import VH3 from '../typography/VH3';
import indents from '../../mixins/indents';

export default {
  props: {
    w100: Boolean
  },
  components: { VH3 },
  mixins: [indents]
};
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
.button:focus {
  background: var(--grey-base);
  box-shadow: 0 0 0 inset var(--yellow-base);
}

.button h3 {
  color: var(--grey-base);
  text-align: center;
}
</style>
