<template>
  <div ref="chatDiv" class="chat">
    <div class="chat__top">
      <VButtonBack color="white"></VButtonBack>
      <div class="chat__top__info" v-if="CHAT">
        <VAvatarSmall
          :mark="
            CHAT.user_status ? { borderColor: 'var(--grey-light1)' } : null
          "
          size="40px"
          :src="CHAT.user.avatar_src"
        ></VAvatarSmall>
        <div>
          <VP>{{ CHAT.user.name }}</VP>
          <VCaption color="var(--grey-light3)">
            {{ CHAT.user_status ? 'онлайн' : 'не в сети' }}
          </VCaption>
        </div>
      </div>
    </div>

    <div ref="messages" class="chat__main" v-if="CHAT">
      <AllMessages
        class="chat__main__content"
        :chat="CHAT"
        :myId="ME.id"
      ></AllMessages>
    </div>

    <MessageInput
      class="chat__bottom"
      ref="messageInputArea"
      @sendMessage="sendMessage"
      @heightChanged="scrollToBottom"
    ></MessageInput>
  </div>
</template>

<script>
import { VButtonBack, VAvatarSmall } from '../../components/'
import {
  AllMessages,
  MessageInput
} from '../../components/pages/messages/_user_id/'
import { mapGetters } from 'vuex'

export default {
  components: {
    AllMessages,
    VAvatarSmall,
    VButtonBack,
    MessageInput
  },
  layout: 'noNavAuth',
  data() {
    return {
      input: '',
      bottomOffset: '30px'
    }
  },
  methods: {
    sendMessage(text) {
      this.$store.dispatch('chat/SEND_MESSAGE', {
        text,
        to_user_id: this.CHAT.user_id
      })
    },
    scrollToBottom() {
      const el = this.$refs.messages
      el.scrollTop = el.childNodes[0].clientHeight
    },
    focusOnMessageInputArea() {
      if (this.$refs.messageInputArea) this.$refs.messageInputArea.focusOnArea()
    }
  },
  watch: {
    CHAT: {
      deep: true,
      handler() {
        this.$nextTick(() => this.scrollToBottom())
      }
    }
  },
  computed: {
    ...mapGetters({
      CHAT: 'chat/GET_CURRENT_CHAT',
      ME: 'user/GET_USER'
    })
  },

  async fetch({ store, params, redirect }) {
    const user_id = parseInt(params.user_id)
    const index = store.state.chat.chats
      .map(item => item.user_id)
      .indexOf(user_id)
    try {
      if (index === -1 || store.state.chat.chats[index].messages.length === 1) {
        await store.dispatch('chat/FEED_CHAT_WITH_USER_ID', {
          id: user_id,
          setAsCurrent: true
        })
      } else {
        await store.dispatch('chat/SET_CURRENT_CHAT_FROM_CHATS', user_id)
      }
    } catch (e) {
      redirect('/messages')
    }
  },
  async mounted() {
    this.$nextTick(() => {
      this.scrollToBottom()
    })
    document.addEventListener('keypress', () => {
      this.focusOnMessageInputArea()
    })
    await this.$store.dispatch('chat/SET_LAST_SEEN_MESSAGE')
  },
  destroyed() {
    document.removeEventListener('keypress', () => {})
    this.$store.dispatch('chat/RETURN_CURRENT_CHAT')
  }
}
</script>

<style scoped>
.chat {
  max-width: var(--body-max-width);
  margin: auto;
  --space-new: calc(var(--space) * 2 / 3);
  --message-offset: var(--space-half);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-flow: column;
  height: 100%;
}

.chat .chat__top {
  display: flex;
  align-items: center;
  width: 100%;

  padding: var(--space-half);
  box-sizing: border-box;
  background-color: var(--grey-light1);
  z-index: 1000;
}
.chat .chat__top__info {
  display: flex;
  margin-left: var(--space-new);
}
.chat .chat__top__info > div {
  margin-right: var(--space-new);
}

.chat__main {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.chat__main__content {
  margin-top: auto;
}
</style>
