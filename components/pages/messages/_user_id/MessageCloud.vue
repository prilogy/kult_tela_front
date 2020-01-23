<template>
  <div
    :class="{
      message: true,
      'message--my': isMy,
      'message--my--mark': isLastInSeq && isMy,
      'message--mark': isLastInSeq && !isMy
    }"
  >
    <VP class="message__text" v-text="message.text"></VP>
    <VCaption class="message__time">{{ message.time }}</VCaption>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String
    },
    isMy: {
      type: Boolean
    },
    mark: {
      type: Boolean
    },
    isLastInSeq: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
.message {
  position: relative;
  align-self: flex-start;
  width: fit-content;
  display: flex;
  padding: var(--space-half);
  background: var(--grey-light2);
  border-radius: var(--radius);
  color: var(--white-base);
  flex-direction: column;
  max-width: 75vw;
}

.message .message__text {
  word-break: break-all;
  white-space: pre-line;
  font-weight: 300;
  z-index: 10;
}

.message .message__time {
  color: var(--white-trans2);
  margin-top: 2px;
  align-self: flex-end;
  font-size: 13px;
  margin-left: var(--space-third);
  z-index: 10;
}

.message--my {
  background: var(--yellow-dark1);
  margin-left: auto;
}

.message--mark::before {
  content: '';
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: -10px;
  height: 20px;
  width: 20px;
  background: var(--grey-light2);
  border-bottom-right-radius: 5px;
}

.message--mark::after {
  content: '';
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: -10px;
  width: 10px;
  height: 20px;
  background: var(--grey-base);
  border-bottom-right-radius: 10px;
}

.message--my--mark::before {
  content: '';
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: -8px;
  height: 20px;
  width: 20px;
  background: var(--yellow-dark1);
  border-bottom-left-radius: 5px;
}
.message--my--mark::after {
  content: '';
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: -10px;
  width: 10px;
  height: 20px;
  background: var(--grey-base);
  border-bottom-left-radius: 10px;
}
</style>
