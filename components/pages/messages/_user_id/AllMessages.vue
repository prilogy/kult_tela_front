<template>
  <div>
    <ul class="messages" v-if="chat">
      <li
        :style="{
          marginBottom:
            chat.messages[index + 1] &&
            chat.messages[index].date.date !==
              chat.messages[index + 1].date.date
              ? 0
              : null
        }"
        class="msg"
        v-for="(msg, index) in chat.messages"
        :key="msg.id"
      >
        <MessageCloud
          :user="
            chat.conversation
              ? chat.users.filter(e => e.id === msg.user_id)[0] || { me: true }
              : null
          "
          :message="msg"
          :isMy="myId === msg.user_id"
          :isLastInSeq="
            !chat.messages[index + 1] ||
              msg.user_id !== chat.messages[index + 1].user_id
          "
          :isLastSeq="lastSeqIds.includes(msg.id)"
          :lastSeenMessageId="chat.last_seen_message_id || -1"
        />
        <div
          class="messages__date"
          v-if="
            chat.messages[index + 1] &&
              chat.messages[index].date.date !==
                chat.messages[index + 1].date.date
          "
        >
          <VP style="font-weight: 300">
            {{ getAlias(chat.messages[index + 1].date.date) }}
          </VP>
        </div>
      </li>
      <li
        v-if="chat.is_empty && (!chat.messages || chat.messages.length === 0)"
        class="msg--chat_is-empty"
      >
        <VP>Здесь будет история переписки</VP>
      </li>
    </ul>
  </div>
</template>

<script>
  import MessageCloud from './MessageCloud'
  import dateFuncs from '../../../../mixins/dateFuncs'

  export default {
    components: { MessageCloud },
    mixins: [dateFuncs],
    props: ['chat', 'myId'],
    computed: {
      lastSeqIds() {
        const user_id = this.chat.messages[this.chat.messages.length - 1].user_id
        const chat = this.chat

        let ids = []
        for (let i = chat.messages.length - 1; i >= 0; i--) {
          if (chat.messages[i].user_id === user_id) {
            ids.push(chat.messages[i].id)
          } else break
        }
        return ids
      }
    }
  }
</script>

<style scoped>
  .messages {
    padding: var(--space-new) var(--space-new) 0 var(--space-new);
    display: flex;
    flex-direction: column;
  }

  .messages .msg {
    width: 100%;
    margin-bottom: 6px;
  }

  .messages__date {
    width: 100%;
    text-align: center;
    background: var(--white-trans4);
    margin: var(--space) calc(-1 * var(--space-new)) var(--space) calc(-1 * var(--space-new));
    padding: var(--space-third) var(--space-new);
  }

  .messages__date p {
    color: var(--white-trans1);
  }

  .msg--chat_is-empty {
    margin-bottom: var(--space);
    text-align: center;
  }

  .msg--chat_is-empty p {
    color: var(--grey-light2);
  }
</style>
