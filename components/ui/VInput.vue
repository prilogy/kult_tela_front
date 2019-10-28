<template>
  <input class="input" v-model="content" @input="handleInput" />
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      content: this.value
    };
  },
  methods: {
    handleInput(e) {
      this.$emit('input', this.content);
    }
  }
};
</script>

<style scoped>
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
