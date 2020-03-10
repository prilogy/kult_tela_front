<template>
  <div class="box_wrapper">
    <div v-if="image_preview && !imageLocked && !locked" class="image_preview">
      <VP color="var(--grey-light3)" weight="300">
        Прикрепленные вложения
      </VP>
      <div class="image_preview__row">
        <img class="image_preview__img" :src="image_preview" />
        <VButton class="image_preview__row__btn" @click="resetImage" level="p">
          Открепить
        </VButton>
      </div>
    </div>
    <div class="box">
      <div
        v-if="attach && !imageLocked && !locked"
        @click="$refs.imageInput.click()"
      >
        <svg
          class="svg_attachment"
          width="21"
          height="25"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.53 1.46a5.08 5.08 0 00-7.12 0L1.9 8.88a.58.58 0 000 .82c.23.23.6.23.84 0l7.5-7.41a3.97 3.97 0 015.44 0 3.79 3.79 0 010 5.38L5.22 18.15c-.9.88-2.46.88-3.35 0a2.33 2.33 0 010-3.32L11.92 4.77a.92.92 0 011.26 0c.34.34.34.9 0 1.25l-9.64 9.64c-.2.2-.2.63 0 .83.24.23.61.23.84 0l9.63-9.65c.81-.8.81-2.1 0-2.9a2.14 2.14 0 00-2.93 0L1.03 14a3.51 3.51 0 002.51 6c.95 0 1.85-.36 2.52-1.02L16.53 8.5a4.95 4.95 0 000-7.04z"
          />
        </svg>
      </div>

      <div
        v-if="!locked"
        ref="area"
        @input="handleArea"
        @focus="focused"
        placeholder="Напишите сообщение..."
        class="box__input"
        contenteditable
        @keydown="handleKeys"
      ></div>
      <button
        v-if="!locked"
        :class="{
          box__btn: true,
          'box__btn--disabled': input === ''
        }"
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

      <VP v-if="locked" class="locked">
        Этот чат недоступен
      </VP>
      <input
        accept="image/*"
        style="display: none;"
        type="file"
        ref="imageInput"
        @change.prevent="handleImage"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageLocked: Boolean
  },
  data() {
    return {
      input: '',
      lineNumber: 1,
      locked: false,
      attach: false,
      image_preview: null,
      image_src: null
    }
  },
  methods: {
    resetImage() {
      this.image_preview = null
      this.$emit('imageDeleted')
    },
    handleImage(e) {
      e.preventDefault()
      if (e.target.files[0]) {
        this.$emit('imageUploaded', e.target.files[0])
        this.createImage(e.target.files[0])
      }
    },
    createImage(file) {
      let image = new Image()
      const reader = new FileReader()

      reader.onload = e => {
        this.image_preview = e.target.result
      }
      reader.readAsDataURL(file)
    },
    focused() {
      this.$emit('focused')
    },
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
      if (this.input.trim() !== '') this.$emit('sendMessage', this.input)
      this.$refs.area.innerHTML = ''
      this.input = ''
      this.focusOnArea()
    }
  },
  created() {
    const chat = this.$store.state.chat.currentChat
    if (chat.users.filter(e => typeof e.admin_role_id === 'number').length > 0)
      this.attach = true
    if (chat) if (chat && chat.locked) this.locked = true
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'chat/SET_CURRENT_CHAT') {
        if (state.chat.currentChat && state.chat.currentChat.locked)
          this.locked = true
      }
    })
  }
}
</script>

<style scoped>
.box__input[placeholder]:empty::before {
  content: attr(placeholder);
  color: var(--grey-light2);
  font-weight: 400;
}

.box_wrapper {
  background: var(--grey-light1) !important;
  padding: var(--space-half);
}

.image_preview {
  margin-bottom: var(--space-third);
}

.image_preview > p {
  margin-bottom: var(--space-third);
}

.image_preview__row {
  display: flex;
  align-items: center;
}
.image_preview__img {
  max-height: 100px;
}

.image_preview__row__btn {
  margin-left: -30px;
  box-shadow: -5px 0 20px var(--grey-trans1);
}

.svg_attachment {
  padding: 4px var(--space-third);

  cursor: pointer;
}

.svg_attachment path {
  fill: var(--grey-light2);
}
.box__input[placeholder]:empty:focus::before {
  content: '';
}
.box >>> p {
  text-align: center;
  width: 100%;
  color: var(--grey-light3);
  font-weight: 300;
}
.box > div {
  transition: 0s height !important;
}
.box {
  max-width: var(--body-max-width);

  box-sizing: border-box;
  align-items: flex-end;

  display: flex;
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
