<template>
  <div>
    <ul class="messages" v-if="chat">
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
          class="messages__date"
          v-if="
            chat.messages[index + 1] &&
              chat.messages[index].date !== chat.messages[index + 1].date
          "
        >
          <VCaption>{{ chat.messages[index + 1].date }}</VCaption>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import MessageCloud from './MessageCloud'
export default {
  components: { MessageCloud },
  props: ['chat', 'myId']
}
</script>

<style scoped>
.messages {
  padding: 0 var(--space-new);
  display: flex;
  flex-direction: column;
}

.messages .msg {
  width: 100%;
  margin-bottom: var(--space-half);
}

.messages__date {
  width: 100%;
  text-align: center;
  background: var(--white-trans4);
  margin-top: var(--space-half);
  padding: var(--space-third) var(--space-new);
  margin-left: calc(-1 * var(--space-new));
  margin-right: calc(-1 * var(--space-new));
}

.messages__date p {
  color: var(--white-trans1);
}
</style>
