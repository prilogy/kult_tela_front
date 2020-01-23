<template>
  <div class="box">
    <div
      ref="area"
      @input="handleArea"
      class="box__input"
      contenteditable
      @keydown="handleKeys"
    ></div>
    <button
      :class="{ box__btn: true, 'box__btn--disabled': input === '' }"
      @click="sendMessage"
    >
      <svg
        width="20"
        fill="var(--yellow-base)"
        height="18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.4 17.4l17.45-7.48a1 1 0 000-1.84L1.4.6a.993.993 0 00-1.39.91L0 6.12c0 .5.37.93.87.99L15 9 .87 10.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      lineNumber: 1
    }
  },
  methods: {
    handleArea(e) {
      this.input = e.target.innerText
    },
    handleKeys(e) {
      if (e.key === 'Backspace') {
        if (this.lineNumber > 0) this.lineNumber -= 1
      }
      if (e.key === 'Backspace' || e.key === 'Enter') {
        this.$emit('heightChanged')
      }
      if (e.key === 'Enter') {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          this.sendMessage()
        }
        if (this.input === '') {
          e.preventDefault()
        }
      }
    },
    focusOnArea() {
      this.$refs.area.focus()
    },
    sendMessage() {
      if (this.input) this.$emit('sendMessage', this.input)
      this.$refs.area.innerHTML = ''
      this.input = ''
      this.focusOnArea()
    }
  },
  mounted() {
    this.focusOnArea()
  }
}
</script>

<style scoped>
.box > div {
  transition: 0s height !important;
}
.box {
  max-width: var(--body-max-width);
  /*margin: 0 auto;*/
  /*position: fixed;*/
  /*bottom: 0;*/
  /*right: 0;*/
  /*left: 0;*/
  background: var(--grey-light1) !important;

  box-sizing: border-box;
  align-items: flex-end;

  display: flex;
  padding: var(--space-half);
  z-index: 1000;
}

.box__input {
  width: 100%;
  font-size: 18px;
  color: var(--white-base);
  font-weight: 300;
  background: none;
  border: none;
  resize: none;
  padding: var(--space-third);
  line-height: 1.3;
  overflow: hidden;
  border-radius: var(--radius-half);
  max-height: 130px;
  overflow-y: auto;
}

.box__input:active,
.box__input:focus {
  outline: none;
  background: var(--grey-trans2);
}

.box__btn {
  padding: var(--space-third);
  cursor: pointer;
  margin-left: var(--space-third);
}

.box__btn--disabled svg {
  fill: var(--grey-light2);
}

.box__btn:focus,
.box__btn:active,
.box__btn:hover {
  opacity: 0.5;
}
</style>
