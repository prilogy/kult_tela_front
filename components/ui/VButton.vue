<template>
  <button
    @click="click"
    :style="{ ...indents, ...buttonStyle }"
    :disabled="disabled"
    :class="{
      button: true,
      'button--w100': w100,
      'button--disabled': disabled,
      'button--clear': clearstyle
    }"
  >
    <VH3 :weight="weight" :color="color">
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
    disabled: Boolean,
    bg: String,
    color: String,
    clearstyle: Boolean
  },
  components: { VH3 },
  mixins: [indents],
  computed: {
    buttonStyle() {
      return {
        background: this.bg
      }
    }
  },
  methods: {
    click(e) {
      if (this.disabled === true) e.preventDefault()
      else this.$emit('click')
    }
  }
}
</script>

<style scoped>
.button {
  cursor: pointer;
  background: var(--yellow-base);
  padding: var(--space-half) var(--space);
  border-radius: var(--radius-half);
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

.button--clear {
  border: none;
  color: unset;
  background: unset;
  padding: unset;
}

.button--clear:hover,
.button--clear:focus,
.button--clear:active {
  transform: unset;
  box-shadow: unset;
}

.button h3 {
  color: var(--grey-base);
  text-align: center;
}
</style>
