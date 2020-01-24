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
    <div class="message__bottom">
      <VCaption class="message__time">{{ message.time }}</VCaption>
      <DoneIcon
        v-if="isMy"
        size-modificator="0.73"
        :fill="
          message.id <= lastSeenMessageId
            ? 'var(--yellow-base)'
            : 'var(--white-trans2)'
        "
        :double="message.id <= lastSeenMessageId"
      ></DoneIcon>
    </div>
  </div>
</template>

<script>
import DoneIcon from '../DoneIcon'

export default {
  components: { DoneIcon },
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
    },
    isLastSeq: {
      type: Boolean
    },
    lastSeenMessageId: {
      type: Number
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
  max-width: 75vw;
  flex-wrap: wrap;
}

.message__bottom {
  margin-top: 3px;
  display: inline-flex;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 10;
  margin-left: auto;
}

.message .message__bottom .message__time {
  color: var(--white-trans2);
  align-self: flex-end;
  font-size: 13px;
  margin-right: 4px;
  margin-left: var(--space-new);
}

.message .message__text {
  word-break: break-all;
  white-space: pre-line;
  font-weight: 300;
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
