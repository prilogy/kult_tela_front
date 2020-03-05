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
      v-model="content"
      @input="handleInput"
    />
  </div>
</template>
<script>
export default {
  props: ['value', 'caption', 'type'],
  data() {
    return {
      content: this.value
    }
  },
  methods: {
    handleInput(e) {
      let content = this.content
      if (this.type === 'number') content = content.split(',').join('.')
      this.$emit('input', content)
    }
  }
}
</script>

<style scoped>
h3 {
  margin-bottom: var(--space-third);
  font-weight: 400;
}

.input {
  background: var(--grey-light2);
  width: 100%;
  font-size: var(--h3-fs);
  color: var(--grey-light3);
  padding: var(--space-third) var(--space-half);
  box-sizing: border-box;
  border-radius: var(--radius-half);
}

.input:active,
.input:focus {
  background: var(--yellow-trans2);
  color: var(--yellow-base);
}
</style>
