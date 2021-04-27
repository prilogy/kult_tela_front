<template>
  <div>
    <VH3 weight="regular" v-if="caption">
      {{ caption }}
    </VH3>
    <input
      :id="'input-' + this.$attrs.placeholder || 'input'"
      v-bind="$attrs"
      :type="type"
      class="input"
      :value="value"
      @input="handleInput($event.target.value)"
    />
  </div>
</template>
<script>
export default {
  props: ['value', 'caption', 'type'],
  methods: {
    handleInput(value) {
      if (this.type === 'number') value = value.split(',').join('.')
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
h3 {
  margin-bottom: var(--space-third);
  font-weight: 400;
}

.input[type='date']::-webkit-calendar-picker-indicator {
  background: none;
}

.input {
  -webkit-appearance: none;
  user-select: auto !important;
  background: var(--grey-light2);
  width: 100%;
  font-size: var(--h3-fs);
  color: var(--grey-light3);
  padding: var(--space-third) var(--space-half);
  box-sizing: border-box;
  border-radius: var(--radius-half);
  min-height: 45px;
}

.input:active,
.input:focus {
  background: var(--yellow-trans2);
  color: var(--yellow-base);
}
</style>
