<template>
  <div class="box_wrapper">
    <div>
      <div v-if="image_preview && !imageLocked && !locked" class="image_preview">
        <VP color="var(--grey-light3)" weight="300">
          Прикрепленные вложения
        </VP>
        <div class="image_preview__row">
          <img class="image_preview__img" :src="image_preview"/>
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
        <button v-if="!locked" @click.prevent="toggleEmoji()" class="box__emoji-btn">
          <svg viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path :fill="emoji ? 'var(--yellow-base)' : 'var(--grey-light2)'"
                  d="M375 220c-11 0-20-9-20-20a10 10 0 00-20 0 20 20 0 11-40 0 50 50 0 01100 0c0 11-9 20-20 20zm-157-20a50 50 0 00-100 0 20 20 0 1040 0 10 10 0 0120 0 20 20 0 1040 0zm170 275a20 20 0 00-20-34 216 216 0 1167-65 20 20 0 1034 22A255 255 0 00256 0 254 254 0 000 256a254 254 0 00256 256c47 0 93-13 132-37zm-46-184c-7 0-12 3-16 8 0 0-26 28-70 28s-70-28-70-28a20 20 0 10-30 26c4 4 39 42 100 42s96-38 100-42a20 20 0 00-14-34z"/>
          </svg>
        </button>
        <button
          v-if="!locked"
          :class="{
          box__btn: true,
          'box__btn--disabled': (input === '' && !image_preview) || sendLocked
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
      <div v-if="emoji" class="box__emoji">
        <VP color="var(--grey-light3)" style="font-weight: 300">Панель emoji</VP>
        <ul class="box__emoji__list">
          <li @click="appendEmoji(item)" class="box__emoji__list__item" v-for="item in emojis">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      imageLocked: Boolean,
      sendLocked: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        input: '',
        lineNumber: 1,
        locked: false,
        attach: false,
        image_preview: null,
        image_src: null,
        emoji: false,
        emojis: ['😀', '😁', '😂', '😃', '😅', '😎', '😍', '🥰', '🙂', '🤗', '🤩', '🤔', '🤨', '😮', '🙄', '😑', '😐', '😒', '😜', '😲', '😖', '😤', '🤯', '😱', '😰', '😷', '😡', '😠', '🤬', '🤠', '🤡', '👻', '👾', '👀', '💪', '👌', '👍', '👎', '👊', '🙌', '🤚', '👋', '🙏', '🤝']
      }
    },
    methods: {
      appendEmoji(text) {
        let sel, range
        try {
          if (window.getSelection) {
            sel = window.getSelection()
            if (sel.getRangeAt && sel.rangeCount) {
              range = sel.getRangeAt(0)
              range.deleteContents()
              range.insertNode(document.createTextNode(text + ' '))
              this.input += text
              range.collapse()
            }
          } else if (document.selection && document.selection.createRange) {
            document.selection.createRange().text = text
            this.input += text
          }
        } catch (e) {
        }
      },
      toggleEmoji(v = null) {
        this.emoji = v === null ? !Boolean(this.emoji) : v
      },
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
        this.emoji = false
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
        if(this.sendLocked) return;
        if (this.input.trim() !== '' || this.image_preview) this.$emit('sendMessage', this.input)
        this.$refs.area.innerHTML = ''
        this.input = ''
        this.focusOnArea()
      }
    },
    created() {
      const chat = this.$store.state.chat.currentChat
      if (chat.users.filter(e => typeof e.admin_role_id === 'number').length > 0 || chat.conversation === true)
        this.attach = true
      if (chat) if (chat && chat.locked) this.locked = true
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'chat/SET_CURRENT_CHAT') {
          if (state.chat.currentChat && state.chat.currentChat.locked)
            this.locked = true
        }
      })
    },
    mounted() {
      this.$refs.area.focus()
      this.$refs.area.blur()
    }
  }
</script>

<style scoped>
  .box__emoji-btn {
    font-size: 24px;
    color: white;
    margin-left: var(--space-third);
    padding: var(--space-third);
  }

  .box__emoji {
    background: var(--grey-light1);
    padding: var(--space-third);
  }

  .box__emoji__list {
    margin-top: var(--space-half);
    display: flex;
    flex-wrap: wrap;
    height: 150px !important;
    overflow-y: scroll;
  }

  .box__emoji__list__item {
    width: 40px;
    height: 40px;
    font-size: 18px;
    box-sizing: border-box;
    border-radius: 10px;
    padding: var(--space-half);
  }

  .box__emoji__list__item:hover, .box__emoji__list__item:active, .box__emoji__list__item:focus {
    background: var(--white-trans4);
  }

  .box__input[placeholder]:focus::before {
    content: '' !important;
  }

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
    min-height: 25px;
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
