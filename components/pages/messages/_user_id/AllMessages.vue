<template>
  <ul class="chat__main__messages">
    <li class="msg" v-for="(msg, index) in chat.messages" :key="msg.id">
      <MessageCloud
        :message="msg"
        :isMy="myId === msg.user_id"
        :isLastInSeq="
          !chat.messages[index + 1] ||
            msg.user_id !== chat.messages[index + 1].user_id
        "
      />
      <div
        class="chat__main__messages__date"
        v-if="
          chat.messages[index + 1] &&
            chat.messages[index].date !== chat.messages[index + 1].date
        "
      >
        <VCaption>{{ chat.messages[index + 1].date }}</VCaption>
      </div>
    </li>
  </ul>
</template>

<script>
import MessageCloud from './MessageCloud'
export default {
  components: { MessageCloud },
  props: ['chat', 'myId']
}
</script>

<style scoped>
.chat__main__messages {
  display: flex;
  flex-direction: column;
}

.chat__main__messages .msg {
  width: 100%;
  margin-bottom: var(--message-offset);
}

.chat__main__messages__date {
  width: 100%;
  text-align: center;
  background: var(--white-trans4);
  margin: var(--message-offset) calc(var(--space) * (-1)) 0
    calc(var(--space) * (-1));
  padding: var(--space-third) var(--space);
}

.chat__main__messages__date p {
  color: var(--white-trans1);
}
</style>
