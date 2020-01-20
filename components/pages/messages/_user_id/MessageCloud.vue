<template>
  <div :class="{ message: true, 'message--my': message.user_id == me_id }">
    <VP class="message__text">
      {{ message.text }}
    </VP>
    <VCaption class="message__time">{{ message.time }}</VCaption>
  </div>
</template>

<script>
export default {
  props: ['message', 'me_id']
}
</script>

<style scoped>
.message {
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
  font-weight: 300;
}

.message .message__time {
  color: var(--white-trans2);
  margin-top: 2px;
  align-self: flex-end;
  font-size: 13px;
  margin-left: var(--space-third);
}

.message--my {
  background: var(--yellow-trans2);
  margin-left: auto;
}
</style>
