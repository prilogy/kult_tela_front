<template>
  <div>
    <VH3 weight="regular" v-if="caption">
      {{ caption }}
    </VH3>
    <input
      v-bind="$attrs"
      class="input"
      v-model="content"
      @input="handleInput"
    />
  </div>
</template>

<script>
import VH3 from '../typography/VH3'
export default {
  components: { VH3 },
  props: ['value', 'caption'],
  data() {
    return {
      content: this.value
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', this.content)
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
}

.input:active,
.input:focus {
  background: var(--yellow-trans2);
  color: var(--yellow-base);
}
</style>
